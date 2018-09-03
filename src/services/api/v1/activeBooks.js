import { apiCall } from '../../api'
import { ORDERSTATUS } from '../../../common/data/orderStatus'

export function getActiveBookByMember(memberId, token, callback = undefined) {
    return apiCall('get', `/active_books/get_by_member?member_id=${memberId}`, undefined, {
        'Authorization': `Bearer ${token}`
    }, callback);
}

export function createActiveBook(memberId, srcLat, srcLng, dstLat, dstLng, from, to, price, token, callback = undefined) {
    return apiCall('post', `/active_books/create_active_book`, {
        member_id: memberId,
        driver_id: null,
        order_status_id: ORDERSTATUS.PENDING,
        src_lat: srcLat,
        src_long: srcLng,
        dest_lat: dstLat,
        dest_long: dstLng,
        price: price,
        from: from,
        to: to
    }, {
            'Authorization': `Bearer ${token}`
        }, callback);
}