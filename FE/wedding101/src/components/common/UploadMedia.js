import './UploadMedia.css';

import UploadIcon from '@mui/icons-material/Upload';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function UploadMedia({media}) {
    const [filePreview, setFilePreview] = useState(media);
    const [fileMedia, setFileMedia] = useState(media);
    
    // 파일 미리보기 구현
    const fileImageHandler = (e) => {
        const file = e.target.files[0];
        if(!isValidFile(file)){
            alert("is not valid file")
            return
        }
        setFileMedia(file);
        console.log(e.target);

        if(file.type.includes('image')){
            const image = new Image();
            image.src = URL.createObjectURL(file);
            sessionStorage.setItem(media, image.src);

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // 이미지 비율 맞추기
                const aspectRatio = image.width / image.height;
                let width = 200;
                let height = 300;

                if(image.width > image.height) {
                    if(image.width > 200) {
                        height = 200 / aspectRatio;
                    }
                } else {
                    if(image.height > 300) {
                        width = 300 * aspectRatio;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, 0, 0, width, height);

                setFilePreview(canvas.toDataURL('image/png'));
            };
        }else if(file.type.includes('video')){
            
            setFilePreview(URL.createObjectURL(file));
    }
        else {
            console.error("File type not Supported");
        }
    };
    // file 크기 초과검사
    const isValidFile = (file) => {
        if(file.size > 20*1024*1024){
            console.error("File size exceeds 20MB");
            return false;
        }
        return true;
    }
    // 업로드 파일 삭제(메모리관리)
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileMedia);
        setFileMedia('');
        setFilePreview('');
    };


    // 파일 업로드 구현
    const onFileUpload = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", fileMedia);
        console.log(formData);

        await axios({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "POST",
            url: "http://localhost:8080/",  // 파일 업로드 요청 URL
            data: formData,
        }).then((res) => {
            console.log(res);
    }).catch(err => {
        alert('등록을 실패하였습니다.');
    });
    };

    return (
        <div>
            <div className='media-area'>
                {filePreview && (
                    <div>
                    {fileMedia.type.includes('image') ? (
                    <img src={filePreview} alt="preview" />
                ) : (
                    <video controls src={filePreview} />
                )}
                </div>
                )}
            </div>
            <IconButton aria-label='upload picture' component="label">
                <input
                    hidden
                    type="file"
                    accept='image/*, video/*'
                    onChange={fileImageHandler}
                    />
                <UploadIcon fontSize='large' />
            </IconButton>
            <Button onClick={deleteFileImage}>삭제</Button>
            <Button onClick={onFileUpload}>확정</Button>
        </div>
    );
}
export default UploadMedia;