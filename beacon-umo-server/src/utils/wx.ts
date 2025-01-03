import * as xml from "xml2js"

// 生成文本消息响应
export const generateTextMessage = (toUserName: string, fromUserName: string, content: string) => {
    const builder = new xml.Builder();
    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['text'],
            Content: [content]
        }
    });
}

// 生成图片消息响应
export const generateImageMessage = (toUserName: string, fromUserName: string, mediaId: string) => {
    const builder = new xml.Builder();
    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['image'],
            Image: {
                MediaId: [mediaId]
            }
        }
    });
}

// 生成语音消息响应
export const generateVoiceMessage = (toUserName: string, fromUserName: string, mediaId: string) => {
    const builder = new xml.Builder();
    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['voice'],
            Voice: {
                MediaId: [mediaId]
            }
        }
    });
}

// 生成视频消息响应
export const generateVideoMessage = (toUserName: string, fromUserName: string, mediaId: string, title: string, description: string) => {
    const builder = new xml.Builder();
    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['video'],
            Video: {
                MediaId: [mediaId],
                Title: [title],
                Description: [description]
            }
        }
    });
}

// 生成音乐消息响应
export const generateMusicMessage = (toUserName: string, fromUserName: string, mediaId: string, title: string, description: string, musicUrl: string, hqMusicUrl: string) => {
    const builder = new xml.Builder();

    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['music'],
            Music: {
                Title: [title],
                Description: [description],
                MusicUrl: [musicUrl],
                HQMusicUrl: [hqMusicUrl],
                ThumbMediaId: [mediaId]
            }
        }
    });
}

// 生成图文消息响应
export const generateNewsMessage = (toUserName: string, fromUserName: string, articles: { Title: string, Description: string, PicUrl: string, Url: string }[]) => {
    const builder = new xml.Builder();

    return builder.buildObject({
        xml: {
            ToUserName: [toUserName],
            FromUserName: [fromUserName],
            CreateTime: [new Date().getTime()],
            MsgType: ['news'],
            ArticleCount: [articles.length],
            Articles: {
                item: articles.map(article => ({
                    Title: [article.Title],
                    Description: [article.Description],
                    PicUrl: [article.PicUrl],
                    Url: [article.Url]
                }))
            }
        }
    });
}