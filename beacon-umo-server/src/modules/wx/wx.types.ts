export type CheckSignatureQuery = {
    signature: string,
    timestamp: string,
    nonce: string,
    echostr: string
}

export type FollowEventMessage = {
    ToUserName: [string],
    FromUserName: [string],
    CreateTime: [string],
    MsgType: [string],
    Event: ['subscribe' | 'unsubscribe']
}

export type EventMessage = FollowEventMessage

export type Message = { xml: EventMessage }

export const isFollowEventMessage = (message: FollowEventMessage): message is FollowEventMessage => {
    return message.MsgType[0] === 'event'
}