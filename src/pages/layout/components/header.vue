<template>
  <div class="headerNav">
      <div class="navMask"></div>
      <div class="blurBg"></div>
      <div class="navList">
          <div class="navContent">
              <div class="leftBox">
                <div>
                    <p>漫画</p>
                  <section>
                      <ul>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                      </ul>
                  </section>
              </div>
              <div>
                  <p>小说</p>
                  <section>
                      <ul>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                      </ul>
                  </section>
              </div>
              <div>
                  <p>游戏</p>
                  <section>
                      <ul>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                      </ul>
                  </section>
              </div>
              <div>
                  <p>视频</p>
                  <section>
                      <ul>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                      </ul>
                  </section>
              </div>
              <div>
                  <p>最新资讯</p>
                  <section>
                      <ul>
                          <li>漫画1</li>
                          <li>漫画1</li>
                          <li>漫画1</li>
                      </ul>
                  </section>
              </div>
              </div>
              <div class="rightBox" v-if="!loginStatu">
                <div @click="displayLoginBox">
                    登录
                </div>
                <div @click="displayRegisterBox">
                    注册
                </div>
              </div>
              <div class="rightBox" v-else>
                <div>
                    <img @click="gotoAvatar" class="avatar" :src="getAvatar" alt="">
                </div>
                <div>
                    {{userName}}
                </div>
                <div>
                    我的账号
                </div>
                <div>
                    历史记录
                </div>
              </div>
          </div>
      </div>
    <el-dialog
        title="登录"
        :visible.sync="loginBox"
        class="loginBox">
        <el-form status-icon :model="loginData" :rules="loginRules">
            <el-form-item prop="userName"><el-col :span="5">邮箱：</el-col>
                <el-input @focus="remove" :class="loginError? 'error' : ''" 
                v-model="loginData.userName" placeholder="请输入邮箱号"></el-input>
                </el-form-item>
            <el-form-item prop="passWord"><el-col :span="5">密 码：</el-col>
                <el-input @focus="remove" :class="loginError? 'error' : ''" 
                v-model="loginData.passWord" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            <span class="loginErrorText" v-if="loginError">
                <i class="el-icon-warning"></i>
                {{loginErrorText}}
            </span>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="loginFnc()">登 录</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="注册"
        :visible.sync="registerBox"
        class="loginBox">
        <el-form status-icon :model="registerData" :rules="registerRules" ref="ruleForm2">
            <el-form-item label="用户名：" prop="userName">
                <el-input v-model="registerData.userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密 码：" prop="passWord">
                <el-input type="password" v-model="registerData.passWord" placeholder="请输入密码"></el-input></el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="registerData.checkPass" placeholder="请确认密码"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="registerFnc('ruleForm2')">注 册</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { login,register,getUserInfo } from '@/models/userFnc.js';
import { mapGetters } from 'vuex'
// import { userApi } from '@/api/index.js';
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerData.passWord !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerData.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var cheakEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if(!this.isEmail){
            callback(new Error('请验证邮箱'));
        } else {
          callback();
        }
      };
      var userNameCheak = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(value.length > 8 || value.length < 2){
            callback(new Error('长度在 2 到 8 个字符'));
        } else if (this.userNameRepeat){
            callback(new Error('该用户名已被占用'));
        } else {
          callback();
        }
      }
    return {
        loginBox: false,
        registerBox: false,
        userName: '',
        passWord: '',
        userId: JSON.parse(localStorage.userInfo).userId || '',
        avatarUrl: 'https://sanhui-cartoon.oss-cn-hongkong.aliyuncs.com/avatar/default.png',
        loginData: {
            userName: '',
            passWord: '',
        },
        registerData: {
            userName: '',
            email: '',
            passWord: '',
            checkPass: '',
        },
        loginRules:{
          userName:[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        registerRules:{
          passWord: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName:[
            { validator: userNameCheak, trigger: 'blur, change' }
          ],
          email:[
            { validator: cheakEmail, trigger: 'blur' }
          ],
        },
        loginErrorText: '',
        loginError: false,
        loginStatu: '',
        isEmail: false,
        userNameRepeat: false,
    };
  },
  computed:{
    getAvatar() {
      return this.$store.getters.avatar;
    },
    ...mapGetters(["avatar"]),
  },
  mounted(){

  },
  created(){
      this.init()
  },
  watch:{
    'registerData.userName': {
        handler(newVal, oldVal) {
            this.userNameRepeat = false
            this.$refs.ruleForm2.validateField('userName');
        },
    deep: true
    }
  },
  methods:{
      // 编辑头像
    gotoAvatar(){
        this.$router.push('/userinfo/avatar')
    },
    init(){
      if(!localStorage.userInfo)this.loginStatu = false
      else{
          getUserInfo({
              userId: this.userId
          }).then(res => {
            this.loginStatu = true
            this.userName = res.userName
            if(res.avatar === null)
                this.$store.dispatch("initUserInfo",this.avatarUrl);
            else
                this.$store.dispatch("initUserInfo",res.avatar);
          })
      }
    },
    loginFnc(){
        login(
            this.loginData
        ).then(res => {
            if(!res)return;
            if(res.code == 200){
                this.loginBox = false;
                let storage=window.localStorage;
                let userInfo = JSON.stringify(res.data)
                storage.setItem("userInfo", userInfo)
                this.init()
            }
            else if(res.code == 500){
                this.loginError = true;
                this.loginErrorText = res.mesage;
            }else {
                this.$message.error('发生未知错误');
            }
        })
    },
    registerFnc(formName){
        this.dialogVisible = false
        this.$refs[formName].validate((valid) => {
            if (valid) {
                register(
                    this.registerData
                ).then(res => {
                    if(!res)return;
                    this.userNameRepeat = true;
                    this.$refs.ruleForm2.validateField('userName');
                })
            } else {
                return false;
            }
        });
    },
    displayLoginBox(){
        this.loginBox = true;
    },
    displayRegisterBox(){
        this.registerBox = true;
    },
    remove(){
        this.loginError = false;
    }
  }
};
</script>

<style lang='scss'>
    .headerNav{
        position: relative;
        height: 200px;
        width: 100%;
        min-width: 1200px;
        // background-color: black;
        background-image: url('../../../assets/images/banner.png');
        background-position: center;
        .navMask{
            // filter: blur(4px);
            background-color: rgba(0,0,0,.4);
            width: 100%;
            position: absolute;
            top: 0;left: 0;
            height: 50px;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        .blurBg{
            background-image: url('../../../assets/images/banner.png');
            filter: blur(4px);
            position: absolute;
            top: 0;left: 0;
            height: 50px;width: 100%;
            background-position: center -10px;
            background-repeat: no-repeat;
        }
        .navList{
            position: absolute;
            top: 0;
            height: 50px;
            width: 100%;
            min-width: 1200px;
            z-index: 5;
            .navContent{
                margin: 0 auto;
                width: 1200px;
                
                .leftBox{
                    display: inline-block;
                    float: left;
                >div{
                    height: 50px;
                    display: inline-block;
                    color: #ffffff;   
                    line-height: 50px;
                    font-size: 14px;
                    padding-right: 7px;
                    padding-left: 7px;
                    width: 70px;
                    text-align: center;
                    position: relative;
                    float: left;
                    >p{
                        margin: 0;
                    }
                    >section{
                        margin-left: -7px;
                        width: 84px;
                        transform:rotateY(90deg);
                        -ms-transform:rotateY(90deg); 	/* IE 9 */
                        -moz-transform:rotateY(90deg); 	/* Firefox */
                        -webkit-transform:rotateY(90deg); /* Safari 和 Chrome */
                        -o-transform:rotateY(90deg); 	/* Opera */
                    }
                }
                >div:hover{
                    background-color: #ffffff;
                    opacity: 0.7;
                    color: black;
                }
                >div:hover section{
                    transform:rotateY(0deg);
                    -ms-transform:rotateY(0deg); 	/* IE 9 */
                    -moz-transform:rotateY(0deg); 	/* Firefox */
                    -webkit-transform:rotateY(0deg); /* Safari 和 Chrome */
                    -o-transform:rotateY(0deg); 	/* Opera */
                }
                >div:hover section ul li{
                    transform:rotateY(0deg);
                    -ms-transform:rotateY(0deg); 	/* IE 9 */
                    -moz-transform:rotateY(0deg); 	/* Firefox */
                    -webkit-transform:rotateY(0deg); /* Safari 和 Chrome */
                    -o-transform:rotateY(0deg); 	/* Opera */
                }
                } 
                .rightBox {
                    float: right;
                    >div{
                        display: inline-block;
                        color: #ffffff;   
                        line-height: 50px;
                        font-size: 14px;
                        padding-right: 7px;
                        padding-left: 7px;
                        cursor: pointer;
                    }
                    .avatar{
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        position: relative;
                        top: 10px;
                    }
                }
            }
        }
        ul{
            margin: 0;
            padding: 0;
            position: relative;
            li{
                transform:rotateY(90deg);
                -ms-transform:rotateY(90deg);
                -moz-transform:rotateY(90deg);
                -webkit-transform:rotateY(90deg);
                -o-transform:rotateY(90deg);

                transition: transform 0.6s;
                -moz-transition: transform 0.6s; /* Firefox 4 */
                -webkit-transition: transform 0.6s; /* Safari 和 Chrome */
                -o-transition: transform 0.6s; /* Opera */ 
                padding: 0;
                color: #ffffff;
                list-style: none;
                background-color: rgba(0,0,0,.6);
            }
            li:nth-child(2){
                transition: transform 1.2s;
                -moz-transition: transform 1.2s; /* Firefox 4 */
                -webkit-transition: transform 1.2s; /* Safari 和 Chrome */
                -o-transition: transform 1.2s; /* Opera */ 
            }
            li:nth-child(3){
                transition: transform 1s;
                -moz-transition: transform 1s; /* Firefox 4 */
                -webkit-transition: transform 1s; /* Safari 和 Chrome */
                -o-transition: transform 1s; /* Opera */ 
            }
            li:nth-child(4){
                transition: transform 0.7s;
                -moz-transition: transform 0.7s; /* Firefox 4 */
                -webkit-transition: transform 0.7s; /* Safari 和 Chrome */
                -o-transition: transform 0.7s; /* Opera */ 
            }
            >li:hover{
                background-color: #ffffff;
                opacity: 0.7;
                color: black;
            }
        }
        .loginBox{
            .el-dialog{
                width: 450px;
                .el-dialog__body{
                    padding: 20px;
                    position: relative;
                    .loginErrorText{
                        position: absolute;
                        bottom: 5px;
                        left: 100px;
                        color: #F56C6C;
                    }
                }
                .el-row{
                    margin: 20px 0;
                    .el-col{
                        line-height: 40px;
                    }
                    .el-input{
                        width: 260px;
                    }
                }
            }
        }
        .error{
            border-color: #F56C6C;
            .el-input__inner{
                border-color: #F56C6C;
            }
        }
        .el-form-item__label{
            line-height: 25px;
        }
    }
    

</style>
