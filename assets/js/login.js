$(function () {
    var form = layui.form
    var layer = layui.layer
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 通过form.verify()函数定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败！')
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的token字符串 保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})