package com.ssafy.wedding101.model.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.wedding101.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FileService {

    private final AmazonS3 amazonS3;

    private final FileUtil fileUtil;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * 메소드 : uploadImage
     * 작성자 : 권영진
     * 반환값 : (String) 이미지가 저장된 URL 주소
     * 파라미터 : userId, multipartFile
     * 기능 : AWS S3에 이미지 파일을 지정한 경로에 업로드 후 URL 반환
     */
    public String uploadImage(String filePath, MultipartFile multipartFile) {

        // [Step 1] 파일이 저장될 경로를 지정
        StringBuilder fileName = new StringBuilder();
        fileName.append(filePath).append(createFileName(multipartFile.getOriginalFilename()));

        System.out.println(fileName);

        // [Step 2] 업로드할 파일의 메타 데이저 등록
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        // [Step 3] AWS S3에 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName.toString(), inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        // [Step 4] 업로드된 이미지 파일의 URL
        URL url = amazonS3.getUrl(bucket, fileName.toString());
        System.out.println(url.toString());
        return url.toString();
    }

    /**
     * 메소드 : uploadVideo
     * 작성자 : 권영진
     * 반환값 : (String) 비디오가 저장된 URL 주소
     * 파라미터 : userId, multipartFile
     * 기능 : AWS S3에 비디오 파일을 지정한 경로에 업로드 후 URL 반환
     */
    public Map<String,String> uploadVideo(String filePath, MultipartFile multipartFile) {

        // [Step 1] 파일이 저장될 경로를 지정
        StringBuilder fileName = new StringBuilder();

        fileName.append(filePath).append(createFileName(multipartFile.getOriginalFilename()));

        // [Step 2] 업로드할 파일의 메타 데이저 등록
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        // [Step 3] AWS S3에 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName.toString(), inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        // [Step 4] 업로드된 이미지 파일의 URL
        URL videoUrl = amazonS3.getUrl(bucket, fileName.toString());

        // [Step 5] 업로드된 영상으로부터 썸네일 추출
        String thumbNailPath = fileUtil.getThumbnail(videoUrl.toString());

        // [Step 6] 추출된 썸네일을 S3에 업로드
        File file = new File(thumbNailPath);
        StringBuilder thumbNailName = new StringBuilder().append(filePath).append("thumbnail/")
                .append(UUID.randomUUID().toString()).append(".jpg");
        amazonS3.putObject(bucket, thumbNailName.toString(), file);
        URL thumbNailUrl = amazonS3.getUrl(bucket, thumbNailName.toString());

        // [Step 7] 로컬에 저장된 썸네일 삭제
        fileUtil.deleteThumbNail();

        // [Step 7] 영상 Url과 썸네일 Url 반환
        Map<String, String> fileUrl = new HashMap<>();
        fileUrl.put("videoURL", videoUrl.toString());
        fileUrl.put("thumbNailUrl", thumbNailUrl.toString());

        return fileUrl;
    }

    /**
     * 메소드 : uploadMediaImage
     * 작성자 : 권영진
     * 반환값 : (String) 비디오가 저장된 URL 주소, 썸네일이 저장된 URL 주소
     * 파라미터 : multipartFile
     * 기능 : AWS S3에 미디어 객체 비디오를 지정한 경로에 업로드 후 URL 반환
     */
    public String mergeVideo(String filePath, Map<String, List<String>> listMap) throws IOException {

        // 사용자가 선택한 이미지를 local에 다운로드 받는다
        fileUtil.downloadImage(listMap.get("imageList"));

        // 다운로드 받은 이미지들을 ffmpeg을 사용하여 동영상으로 만든다.
        fileUtil.combineImage(listMap.get("imageList"));

        // 사용자가 선택한 비디오를 local에 다운로드 받는다.
        fileUtil.downloadVideo(listMap.get("videoList"), listMap.get("imageList").size());

        // 다운로드 받은 비디오를 합친다. 이 때, 이미지 합본 동영상도 같이 합쳐진다.
        String localFilePath = fileUtil.combineVideo();

        // 합본 영상을 s3 에 올리고 해당 영상의 주소를 저장한다.
        File file = new File(localFilePath);
        amazonS3.putObject(bucket,filePath ,file);

        // 로컬에 다운로드 받았던 모든 파일을 삭제한다.
        fileUtil.deleteMedia(listMap.get("imageList").size(), listMap.get("videoList").size());

        // 영상 합본이 저장된 url 반환
        URL url = amazonS3.getUrl(bucket, filePath);
        return url.toString();
    }

    public void deleteFile(String fileUrl) {

        String fileName = fileUrl.substring(60);
        System.out.println(fileName);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

}
