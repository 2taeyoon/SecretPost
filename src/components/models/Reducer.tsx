export type SettingAction = {
    type: string;
    payload?: string;
}

type SettingState = {
    isSetting: boolean,
    popUp: boolean,
    popUpContent: string,
    nicknameText: string,
    introduceText: string
}

export const settingInitialState: SettingState = {
    isSetting: false,
    popUp: false,
    popUpContent: '',
    nicknameText: '',
    introduceText: ''
}

export const settingReducer = (state: SettingState, action: SettingAction) => {
    switch (action.type) {
        case 'SET_IS_SETTING':
            return { ...state, isSetting: !state.isSetting };
        case 'SET_POP_UP':
            return { ...state, popUp: !state.popUp };
        case 'SET_POP_UP_CONTENT':
            return { ...state, popUpContent: action.payload || '' };
        case 'SET_NICKNAME_TEXT':
            return { ...state, nicknameText: action.payload || '' };
        case 'SET_INTRODUCE_TEXT':
            return { ...state, introduceText: action.payload || '' }
        default:
            return state;
    }
}