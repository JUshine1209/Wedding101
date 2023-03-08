package com.ssafy.wedding101.util;

import lombok.RequiredArgsConstructor;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FileUtil {

    // [의존성 주입]
    private final FFmpeg ffmpeg;

    private final FFprobe ffProbe;

    // [ 상수 설정 : 파일 저장 경로 ]
    private final String basePath = "/root/ffmpeg/temp/";
//    private final String basePath = "C:/Users/SSAFY/Desktop/temp/";


    public void downloadVideo(List<String> videoList, int imageListSize) throws IOException {

        File file = new File(basePath + "videoList.txt");
        BufferedWriter writer = new BufferedWriter(new FileWriter(file));


        for (int i = 0; i < videoList.size(); i++) {
            FFmpegBuilder builder = new FFmpegBuilder()
                    .overrideOutputFiles(true)
                    .addInput(videoList.get(i))
                    .addOutput(basePath + "/video/Test" + i + ".mp4")
                    .addExtraArgs("-c:v", "h264")
                    .setFormat("mp4")
                    .setVideoFrameRate(30, 1)
                    .setVideoCodec("libx265")
                    .done();

            writer.write("file '" + basePath + "/video/Test" + i + ".mp4'\n");

            FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffProbe);
            executor.createJob(builder).run();
        }

        if (imageListSize != 0)
            writer.write("file '" + basePath + "/video/imageList.mp4\n");


        writer.close();
    }

    public void downloadImage(List<String> imageList) throws IOException {

        for (int i = 0; i < imageList.size(); i++) {

            String fileUrl = imageList.get(i);

            String fileName = basePath + "/image/Test" + i + ".jpg";
            Path target = Paths.get(fileName);

            try {
                URL url = new URL(fileUrl);
                InputStream in = url.openStream();
                Files.copy(in, target);
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void deleteMedia(int imageListSize, int videoListSize) {

        File file = null;

        // 다운로드 받았던 이미지들을 삭제한다.
        for (int i = 0; i < imageListSize; i++) {
            file = new File(basePath + "/image/Test" + i + ".jpg");

            if (file.exists()) {
                file.delete();
            }
        }

        // 다운로드 받았던 비디오들을 삭제한다.
        for (int i = 0 ; i < videoListSize ; i++){
            file = new File(basePath + "/video/Test"+i+".mp4");

            if (file.exists()){
                file.delete();
            }
        }

        // 이미지 합본을 삭제한다.
        file = new File(basePath + "/video/imageList.mp4");

        if (file.exists()){
            file.delete();
        }

        // 동영상 합본을 삭제한다.
        file = new File(basePath + "output.mp4");

        if (file.exists()){
            file.delete();
        }

        // 텍스트 파일을 삭제한다.
        file = new File(basePath + "videoList.txt");

        if (file.exists()){
            file.delete();
        }
    }

    public void deleteThumbNail() {
        File file = new File(basePath + "thumbnail.jpg");

        if (file.exists()){
            file.delete();
        }
    }

    public void combineImage(List<String> imageList) {

        if (imageList.size() == 0)
            return;

        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .setInput(basePath + "/image/Test0.jpg");

        for (int i = 0; i < imageList.size(); i++) {
            builder.addExtraArgs("-loop", "1")
                    .addExtraArgs("-t", "3")
                    .addExtraArgs("-i", basePath + "image/Test" + i + ".jpg");
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=2:d=1[v0];");

        for (int i = 1; i < imageList.size(); i++) {
            sb.append("[")
                    .append(i)
                    .append(":v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=2:d=1[v")
                    .append(i)
                    .append("];");
        }

        for (int i = 0; i < imageList.size(); i++) {
            sb.append("[v").append(i).append("]");
        }
        sb.append("concat=n=").append(imageList.size()).append(":v=1:a=0,format=yuv420p[v]");

        System.out.println("hi");
        System.out.println(sb);
        System.out.println("hi");

        builder.setComplexFilter(sb.toString())
                .addOutput(basePath + "video/imageList.mp4")
                .addExtraArgs("-map", "[v]")
                .addExtraArgs("-c:v", "h264")
                .setFormat("mp4")
                .setVideoFrameRate(30, 1)
                .setVideoCodec("libx265")
                .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffProbe);

        executor.createJob(builder).run();
    }

    public String combineVideo() {

        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .addInput(basePath + "videoList.txt")
                .addExtraArgs("-f", "concat")
                .addExtraArgs("-safe", "0")
                .addOutput(basePath + "output.mp4")
                .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffProbe);
        executor.createJob(builder).run();

        return basePath + "output.mp4";
    }

    public String getThumbnail(String inputPath) {

        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .addInput(inputPath)
                .addExtraArgs("-ss", "00:00:01")
                .addOutput(basePath + "thumbnail.jpg")
                .setFrames(1)
                .done();

        FFmpegExecutor excutor = new FFmpegExecutor(ffmpeg, ffProbe);
        excutor.createJob(builder).run();

        return basePath + "thumbnail.jpg";
    }
}
