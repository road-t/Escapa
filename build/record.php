<?php

session_start();

if(!isset($_SESSION['token']))
 $_SESSION['token'] = md5(uniqid(rand(), true));

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$dbhost = "localhost";
$dbname = "gotps3";
$dbuser = "gotps3";
$dbpass = "vivamexico";

$response = [ 'error' => false, 'data' => [], 'csrf' => $_SESSION['token'] ];

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if (!$mysqli->connect_error)
{
    $mysqli->set_charset('utf8');

    if(!isset($_SESSION['player'])) // try to log in
    {
        if (isset($_COOKIE['GESid']))
            $sid = $_COOKIE['GESid'];
        else if (isset($_REQUEST['sid']))
            $sid = $_REQUEST['sid'];
        else
            $sid = null;

        if($sid)
        {
            $sql = "SELECT `id`, `name`, (SELECT MAX(`record`) FROM `new_escape` WHERE `player_id` = `Users`.`id` LIMIT 1) `record` FROM `Users` WHERE SHA1(CONCAT(`Name`, `Password`)) = '" . $mysqli->real_escape_string($sid) . "' LIMIT 1;";
            //, FIND_IN_SET(`record`, (SELECT GROUP_CONCAT(`record` ORDER BY `record` DESC) FROM `escape` )) AS `rank`

            $result = $mysqli->query($sql);

            if ($result->num_rows)
            {
                $player = $result->fetch_assoc();
                $_SESSION['player'] = $player;
                $response['player'] = $player;
                $result->free_result();
            }
            else
                error_log('Player with sid '. $sid .' not found');
        }
        //else
        //error_log('SID is not presented');
    }
    else // player's ok
        $response['player'] = $_SESSION['player'];


    if(isset($_SESSION['player']) && isset($_REQUEST['version']) && isset($_REQUEST['key']) && strlen($_REQUEST['key']) && $_data = base64_decode(substr($_REQUEST['key'], 0, strlen($_REQUEST['key']) - 6)))
    {
        $__data = '';

        for($i = 0; $i < strlen($_data); $i++)
            $__data .=($_data{$i} ^ 'd');

        $_data = explode('|', base64_decode($__data));
        $data = $mysqli->real_escape_string($_data[0]);
        $total = intval($_data[1]);

        if($total && $total < 130000) //score isn't too high
        {
            $broken = false;
/*            $detailed = explode(',', $_data[0]);

            // checking points per level reality
            for($i = 1; $i < sizeof($detailed); $i++)
            {
                if ($i > 5)
                    break;

                if (($i == 5 && $detailed[$i] > 4000) || $detailed[$i] > 6000)
                {
                    $broken = true;
                    $response['g'] = 'sth' + $i;
                    break;
                }
            }*/
        }
        else
        {
            $broken = true;
            error_log('Score is too high: '. $total .'\nData: '. $_data[0] .'\nPlayer: '. $_SESSION['player']['id']);
        }


        if ( !$broken )
        {
            $sql = "INSERT INTO `new_escape` (`player_id`, `record`, `data`, `user_agent`)
                            VALUES ('" . $_SESSION['player']['id'] . "', '$total', '$data', '". $mysqli->real_escape_string($_SERVER['HTTP_USER_AGENT']) ."');";

            $mysqli->query($sql);

            if($mysqli->affected_rows)
            {
                if($total > $_SESSION['player']['record'])
                    $_SESSION['player']['record'] = $total;

                $response['data'] = leaderBoards(true);
                $response['updated'] = true;
                //$response['ololo'] = "INSERT INTO `new_escape` (`player_id`, `record`, `data`, `user_agent`) VALUES ('" . $_SESSION['player']['id'] . "', '$total', '$data', '". $mysqli->real_escape_string($_SERVER['HTTP_USER_AGENT']) ."');";
            }
            else
            {
                $response['updated'] = false;
                error_log('Unable add new record: ' . $mysqli->error .'\nQuery: '. $sql);
            }
        }
        else
        {
            $response['updated'] = false;
            error_log('Unable add new record: ' . $mysqli->error .'\nQuery: '. $sql);
        }
    }
    else
        if(isset($_REQUEST['key']))
            error_log('Some shit has happened');
}
else
{
    $response['error'] = true;
    error_log('Unable to connect to DB: ' . $mysqli->connect_error);
}


if(!$response['data'])
    $response['data'] = leaderBoards();


$response['ts'] = time();

echo json_encode($response);


function leaderBoards($update = false)
{
    if(!($redis = new Redis()) || !$redis->pconnect('localhost'))
        return false;

    if($update || !($leaders = json_decode($redis->get('escape_top'))))
    {
        global $mysqli;

        $sql = "SELECT `name`, MAX(`record`) `score` FROM `new_escape`, `Users` WHERE `player_id` = `Users`.`id` GROUP BY `player_id` ORDER BY `score` DESC LIMIT 10";

        $records = [];

        $result = $mysqli->query($sql);

        if ($result->num_rows)
        {
            $record = null;

            while ($row = $result->fetch_row())
                $records[] = [$row[0] => $row[1]];

            $result->free_result();
        }
        //else
        //    if($mysqli->error) $response['error'] = true;

        $leaders = $records;

        $redis->delete('escape_top');
        $redis->set('escape_top', json_encode($leaders));
    }

    return $leaders;
}