<a name="readme-top"></a>
# SANN-BEAR
SECV3104-02 PEMBANGUNAN APLIKASI (APPLICATIONS DEVELOPMENT)


`FIle Upload API`

![PHP][PHP]

    $file = $_FILES['file'];
    
    $file_name = $file['name'];

    $file_tmp = $file['tmp_name'];

    $file_size = $file['size'];

    $file_error = $file['error'];

    $file_ext = explode('.', $file_name);

    $file_ext = strtolower(end($file_ext));

    $allowed = array('jpg', 'png', 'pdf', 'jpeg');

    if($approval_file){

        if(in_array($file_ext, $allowed)){

            if($file_error == 0){

                if($file_size <= 10485760){ // file size less than 10MB

                    $file_name_new = $user_id . strtotime(date('Y-m-d h:i:s')) . '.' . $file_ext; // filename

                    $sql_getName = "SELECT * FROM user WHERE user_id = $user_id";

                    $result_getName = mysqli_query($con, $sql_getName);

                    $row_getName = mysqli_fetch_array($result_getName);

                    $dirName = $row_getName['full_name']; // get user name

                    $file_destination = "../file_upload/{{directory_name}}/" . $dirName . "(" . $user_id . ")" . "/" . $file_name_new; // filepath

                    $makeDir = "../file_upload/hall_booking/" . $dirName . "(" . $user_id . ")"; 

                    if (!file_exists($makeDir)) {

                        mkdir($makeDir, 0755, true); // create directory

                    }

                    if(move_uploaded_file($file_tmp, $file_destination)){ // move file to file path

                        $file_path = "../file_upload/hall_booking/" . $dirName . "(" . $user_id . ")/" . $file_name_new;

                    }

                }

            }

        } else {

            $array = array();

            $array[] = array(

                'Message' => 'Sorry, only JPG, JPEG, PNG, & PDF files are allowed to upload.' . $con->error,

                'Code' => "400"

            );

            echo json_encode($array);

        }

    }


<p align="right">(<a href="#readme-top">back to top</a>)</p>

[HTML]:https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[TS]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[PHP]: https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white
