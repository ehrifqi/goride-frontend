import {apiCall} from '../../api'

export function getActiveBookByMember(memberId, token, callback=undefined){
    return apiCall('get', `/active_books/get_by_member?member_id=${memberId}`, undefined, {
        'Authorization': `Bearer ${token}`
    }, callback);
}