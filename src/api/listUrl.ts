import { IType } from "@config/constant"

export const listUrl = {
    auth: {
        logIn: {
            path: 'auth/log-in/',
            type: IType.post
        },
        signUp: {
            path: 'auth/sign-up/',
            type: IType.post
        },
        resetPassword: {
            path: 'auth/reset-password/',
            type: IType.post
        },
        forgotPassword: {
            path: 'auth/reset-password/request',
            type: IType.post
        },
        checkJwtAuth: {
            path: 'auth/check-auth/',
            type: IType.get
        },
    },
    faceAuth: {
        create: {
            path: "face-auth/user/upload",
            type: IType.post
        }
    },
    user: {
        createUser: {
            path: 'user/create/',
            type: IType.post
        },
        getUserProfileById: {
            path: 'user/profile/',
            type: IType.get
        },
        editUserProfileById: {
            path: 'user/profile/',
            type: IType.put
        },
    },
    notice: {
        getNoticesByResident: {
            path: "notice/",
            type: IType.get
        }
    },
    refData: {
        getPropertyList: {
            path: "ref-data/property/",
            type: IType.get
        }
    },
    parcel: {
        createParcel: {
            path: 'parcel/create/',
            type: IType.post
        },
    },
}