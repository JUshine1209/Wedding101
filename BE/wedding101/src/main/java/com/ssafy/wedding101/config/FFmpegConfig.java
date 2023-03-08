package com.ssafy.wedding101.config;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

/*
        분류 : Configuration
        작성 : 권영진
        내용 : Linux에서 FFmpeg을 사용하기 위한 Java Configuration 파일
        진척도 : 최종
 */
@Configuration
public class FFmpegConfig {

    // Ec2 서버에서 FFmpeg, FFprobe의 상대 위치
    public final String ffmpegPath = "/usr/bin/ffmpeg";
    public final String ffprobePath = "/usr/bin/ffprobe";

    // Local 환경에서 FFmpeg, FFprobe의 상대 위치
//    public final String ffmpegPath = "/ffmpeg/bin/ffmpeg.exe";
//    public final String ffprobePath = "/ffmpeg/bin/ffprobe.exe";


    /*
        분류 : Bean
        작성 : 권영진
        내용 : FFmpeg 빈등록 - Linux, Window, Unix 등의 각각의 환경에서 올바르게 선언될 수 있도록 생성
        진척도 : 최종
    */
    @Bean(name = "ffMpeg")
    public FFmpeg fFmpeg() throws IOException {
        FFmpeg ffmpeg = null;

        String osName = System.getProperty("os.name");

        // 운영체제가 window 인 경우 jar에 내장되어있는 ffmpeg 이용
        if (osName.toLowerCase().contains("win")) {
            ClassPathResource classPathResource = new ClassPathResource(ffmpegPath);
            ffmpeg = new FFmpeg(classPathResource.getURL().getPath());
        } else if (osName.toLowerCase().contains("unix") || osName.toLowerCase().contains("linux")) {
            ffmpeg = new FFmpeg(ffmpegPath);
        }

        return ffmpeg;
    }

    /*
    분류 : Bean
    작성 : 권영진
    내용 : FFprobe 빈등록 - Linux, Window, Unix 등의 각각의 환경에서 올바르게 선언될 수 있도록 생성
    진척도 : 최종
    */
    @Bean(name = "ffProbe")
    public FFprobe fFprobe() throws IOException {
        FFprobe fFprobe = null;

        String osName = System.getProperty("os.name");

        if (osName.toLowerCase().contains("win")) {
            ClassPathResource classPathResource = new ClassPathResource(ffprobePath);
            fFprobe = new FFprobe(classPathResource.getURL().getPath());
        } else if (osName.toLowerCase().contains("unix") || osName.toLowerCase().contains("linux")) {
            fFprobe = new FFprobe(ffprobePath);
        }

        return fFprobe;
    }
}
