//Follow Button Effect

$(document).ready(

function(){
$cards = document.getElementsByClassName('col-4');
                for($i=0; $i<10;$i++){
                                $cards[$i].style.display = 'none';
                }               
           document.getElementById("loader").style.display = "none";

})



    $('#sub').on("click", function(){
    
          $cards = document.getElementsByClassName('col-4');
                                for($i=0; $i<10;$i++){
                                $cards[$i].style.display = 'none';
                }

        $q = document.getElementById('q').value;
          document.getElementById("loader").style.display = "block";

    
    $.get("server/Twitter128.php?q="+$q, function(data, status){
          document.getElementById("loader").style.display = "none";
        
          $cards = document.getElementsByClassName('col-4');
                                for($i=0; $i<10;$i++){
                                $cards[$i].style.display = 'block';
                }
            console.log(data);
            $x = JSON.parse(data);
            $len_x = Object.keys($x['statuses']).length;;
            console.log($len_x);
            $cards_media_url = document.getElementsByClassName('media_url');
            $cards_profile_url = document.getElementsByClassName('profile_image_url');
            $cards_user_name = document.getElementsByClassName('user_name');
            $cards_Tweets = document.getElementsByClassName('Tweets');
            $cards_following = document.getElementsByClassName('following');
            $cards_followers = document.getElementsByClassName('followers');
            $cards_screen_name = document.getElementsByClassName('screen_name');
            $cards_text = document.getElementsByClassName('tweet');
            for($i =0; $i<$len_x; $i++){

                        
 
                $created_at = $x['statuses'][$i]['created_at'];
                $tweet = $x['statuses'][$i]['text'];

                $user_name = $x['statuses'][$i]['user']['name'];
                $screen_name = $x['statuses'][$i]['user']['screen_name'];
                $tweets = $x['statuses'][$i]['user']['statuses_count'];
                $following = $x['statuses'][$i]['user']['friends_count'];
                $followers = $x['statuses'][$i]['user']['followers_count'];
                $profile_image_url = $x['statuses'][$i]['user']['profile_image_url'];
                $media_url = "";
                if($x['statuses'][$i]['entities'].hasOwnProperty('media') && $x['statuses'][$i]['entities']['media'][0].hasOwnProperty('type')) {

                        if( $x['statuses'][$i]['entities']['media'][0]['type'].indexOf('photo') > -1)
                        $media_url = $x['statuses'][$i]['entities']['media'][0]['media_url'];
                        else
                            $media_url = "images/FFF.png";
                }
                else{
                    $media_url = "images/FFF.png";
                }


                $cards_media_url[$i].src = $media_url;
                $cards_profile_url[$i].src =$profile_image_url;
                $cards_user_name[$i].innerHTML = $user_name;
                        console.log($user_name);
                $t1 = $cards_Tweets[$i].innerHTML;
                $cards_Tweets[$i].innerHTML = $tweets  +'\n' + '<span>Tweets</span>';
                $t1 = $cards_followers[$i].innerHTML;
                $cards_followers[$i].innerHTML = $followers  + '\n' + '<span>followers</span>';
                $t1 = $cards_following[$i].innerHTML;
                $cards_following[$i].innerHTML = $following + '\n' + '<span>following</span>';
                $cards_screen_name[$i].innerHTML = '@'+$screen_name;
                $cards_text[$i].innerHTML = $tweet;
            }

            $cards = document.getElementsByClassName('col-4');
            for($i=$len_x; $i<10;$i++){
                    console.log('hiding');
                    $cards[$i].style.display = 'none';
            }
    
    })

}); 
    



