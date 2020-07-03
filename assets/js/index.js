$(function() {
    var layer = layui.layer
    var form = layui.form
    getUserInfo()

    // 点击按钮， 实现退出功能
    $('#btnLogout').on('click', function(e) {
        e.preventDefault()
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            // 清楚本地存储中的token
            localStorage.removeItem('token')
            // 关闭confirm询问框
            layer.close(index)
            // 重新跳转到登录页面
            location.href = '/login.html'
        })
    })
})



// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户基本信息失败！')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}