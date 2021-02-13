import { Auth, Channels, Users } from '../api/objects';

type WebSocketError = {
    error: 'InternalError' | 'InvalidSession' | 'OnboardingNotFinished' | 'AlreadyAuthenticated'
};

export type ServerboundNotification = (
    ({ type: 'Authenticate' } & Auth.Session)
);

export type ClientboundNotification = (
    ({ type: 'Error' } & WebSocketError) |
    { type: 'Authenticated' } |
    { type: 'Ready', users: Users.User[], channels: Channels.Channel[] } |

    ({ type: 'Message' } & Channels.Message) |
    ({ type: 'MessageUpdate', id: string, data: Partial<Channels.Message> }) |
    ({ type: 'MessageDelete', id: string }) |

    ({ type: 'ChannelCreate' } & Channels.Channel) |
    ({ type: 'ChannelUpdate', id: string, data: Partial<Channels.Channel> }) |
    ({ type: 'ChannelGroupJoin', id: string, user: string }) |
    ({ type: 'ChannelGroupLeave', id: string, user: string }) |
    ({ type: 'ChannelDelete', id: string }) |

    { type: 'UserRelationship', user: string, status: Users.Relationship } |
    { type: 'UserPresence', id: string, online: boolean }
)
