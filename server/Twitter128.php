<?php

    $token = "3257370926-VI3MYIQF3eEZsGRlNNGV9rjkE4PIUY7X4WfJxWV";
    $token_secret = "YKmh5nmbilAtRNcy0VX9IhuJGbmGUaWvQJEMwaNbOpiKb";
    $consumer_key = "iz1UZSroW4b9zDRjOzU2It1rO";
    $consumer_secret = "oZQ73xLFevmsprlfsbYoP8Smq4rTWBRViNWzfPmmhGDS4FpC87";


$host = 'api.twitter.com';
$method = 'GET';
$path = '/1.1/search/tweets.json'; 


$query = array( 
    'q' => $_GET['q'],
    'count' => '10'
);

$oauth = array(
    'oauth_consumer_key' => $consumer_key,
    'oauth_token' => $token,
    'oauth_nonce' => (string)mt_rand(), 
    'oauth_timestamp' => time(),
    'oauth_signature_method' => 'HMAC-SHA1',
    'oauth_version' => '1.0'
);

$oauth = array_map("rawurlencode", $oauth);
$query = array_map("rawurlencode", $query);

$arr = array_merge($oauth, $query);

asort($arr); 
ksort($arr); 

$querystring = urldecode(http_build_query($arr, '', '&'));

$url = "https://$host$path";


$base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);


$key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);


$signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));


$url .= "?".http_build_query($query);
$url=str_replace("&amp;","&",$url); 

$oauth['oauth_signature'] = $signature;
ksort($oauth);

function add_quotes($str) { return '"'.$str.'"'; }
$oauth = array_map("add_quotes", $oauth);


$auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));

$options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),
                  CURLOPT_HEADER => false,
                  CURLOPT_URL => $url,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_SSL_VERIFYPEER => false);

$feed = curl_init();
curl_setopt_array($feed, $options);
$json = curl_exec($feed);
curl_close($feed);

$twitter_data = json_decode($json);
print_r($json);
$twitter_data_array = (array) $twitter_data;
//print_r($twitter_data_array['statuses']);
$all_user_data = (array) $twitter_data_array['statuses'];
$tweet_count = count($all_user_data);
//echo $tweet_count."\n";
/*
for($i = 0;$i<$tweet_count ; $i++){
	$user_data = (array) $all_user_data[$i];
	echo $user_data['created_at'];
	echo $user_data['text'];
//	echo $user_data['iso_language_code'];

	$user_info = (array) $user_data['user'];
	echo $user_info['name'];
	echo $user_info['screen_name'];
	echo $user_info['description'];
	
	echo "\n******************************************\n"; 

	$entity = (array) $user_data['entities'];



	if(array_key_exists('media',$entity)){
		$media = (array) $entity['media'];
		$media_count = count($media);
		for($j=0 ; $j<$media_count; $j++)
		{
			$media_x = (array)$media[$j];
			echo $media_x['media_url'];	
			}

	}
else{
	echo 'false';
}
	

}*/
