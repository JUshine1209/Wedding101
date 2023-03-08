package com.ssafy.wedding101.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
        분류 : Configuration
        작성 : 권영진
        내용 : AWS S3 사용에 대한 S3, IAM 접근 권한 설정
        진척도 : 최종
 */
@Configuration
public class S3Config {

    // AWS S3 접근에 필요한 accessKey, SecretKey, Region을 상수로 선언
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;
    @Value("${cloud.aws.region.static}")
    private String region;

    /*
    분류 : Bean
    작성 : 권영진
    내용 : AmazonS3Client 빈등록 : Credentials 설정 및 지역 설정으로 접근 권한 허용
    진척도 : 최종
    */
    @Bean
    public AmazonS3Client amazonS3Client() {

        BasicAWSCredentials awsCredits = new BasicAWSCredentials(accessKey, secretKey);

        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredits))
                .build();
    }

}
