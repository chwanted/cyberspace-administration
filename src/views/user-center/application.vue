<template>
  <!-- 个人申请 -->
  <div class="application" v-if="role == 1">
    <van-form ref="target" @submit="onSubmit">
      <div class="base info">
        <van-cell-group inset>
          <van-field
            label="姓名"
            v-model="form.name"
            :required="true"
            name="uname"
            :rules="[
              {
                required: true,
                message: '姓名不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field
            label="手机号码"
            name="phone"
            type="tel"
            v-model="form.phone"
            :required="true"
            maxlength="11"
            :rules="[
              { required: true, message: '手机号码不能为空' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' },
            ]"
          />
          <van-field
            name="cert_number"
            label="身份证号码"
            v-model="form.cert_number"
            :required="true"
            maxlength="18"
            :rules="[
              { required: true, message: '身份证号码不能为空' },
              {
                pattern:
                  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                message: '请输入正确身份证号码',
              },
            ]"
          />
        </van-cell-group>
      </div>
      <div class="additional info">
        <van-cell-group inset>
          <van-field
            label="抖音直播账号"
            name="tiktok_account"
            v-model="form.tiktok_account"
            :required="true"
            :rules="[
              {
                required: true,
                message: '抖音直播账号不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field
            label="资金需求"
            name="funds"
            v-model="form.funds"
            :required="true"
            type="number"
            :rules="[
              {
                required: true,
                message: '资金需求不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field label="电子邮箱" name="email" v-model="form.email" />
        </van-cell-group>
      </div>
      <van-button type="primary" class="btn" native-type="submit"
        >提交</van-button
      >
    </van-form>
  </div>

  <!-- 企业申请 -->
  <div class="application" v-else>
    <van-form ref="target" @submit="onSubmit">
      <div class="base info">
        <van-cell-group inset>
          <van-field
            label="企业名称"
            name="uname"
            v-model="form.name"
            :required="true"
            :rules="[
              {
                required: true,
                message: '企业名称不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field label="所在地址" v-model="form.address" name="address" />
          <van-field name="license" label="营业执照" class="other-input">
            <template #input>
              <van-uploader v-model="form.license" :after-read="afterRead" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="additional info">
        <van-cell-group inset>
          <van-field
            name="total"
            label="主播数量"
            :required="true"
            class="other-input"
            :rules="[
              {
                required: true,
                message: '请选择主播数量',
                trigger: 'onBlur',
              },
            ]"
          >
            <template #input>
              <van-radio-group v-model="form.total">
                <van-radio name="1">10人以内</van-radio>
                <van-radio name="2">10人(含)~30人</van-radio>
                <van-radio name="3">30人(含)~50人</van-radio>
                <van-radio name="4">50人及以上</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            label="资金需求（万元）"
            name="funds"
            v-model="form.funds"
            :required="true"
            type="number"
            :rules="[
              {
                required: true,
                message: '资金需求不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field
            label="联系人"
            name="contact"
            v-model="form.contact"
            :required="true"
            :rules="[
              {
                required: true,
                message: '联系人不能为空',
                trigger: 'onBlur',
              },
            ]"
          />
          <van-field
            label="联系电话"
            name="phone"
            v-model="form.phone"
            :required="true"
            type="tel"
            maxlength="11"
            :rules="[
              { required: true, message: '手机号码不能为空' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' },
            ]"
          />
          <van-field label="电子邮箱" name="email" v-model="form.email" />
        </van-cell-group>
      </div>
      <van-button type="primary" class="btn" native-type="submit"
        >提交</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addFinancial } from "@apis/user-center/index";
import { uploadFile } from "@apis/upload";
import { Toast } from "vant";

export default defineComponent({
  setup() {
    const target = ref(null);
    const route = useRoute();
    const router = useRouter();
    const { role } = route.query; //2 企业申请 1 个人申请
    const checkEmail = (val) => val.includes("@").test(val);

    let newLicense = [];
    const form = reactive({
      name: "",
      phone: "",
      cert_number: "",
      tiktok_account: "",
      funds: null,
      email: "",
      address: "",
      license: [],
      total: null,
      contact: "",
    });

    const dataURLtoFileFun = (dataurl, filename) => {
      // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };

    const afterRead = (file) => {
      let newFile = dataURLtoFileFun(file.content, file.file.name);
      uploadFile(newFile).then((res) => {
        if (!res) {
          Toast.fail("上传失败!");
          return;
        }
        newLicense.push(res[0].id);
      });
    };

    const onSubmit = () => {
      const toast = Toast.loading({
        message: "新增中...",
        duration: 0,
      });

      if (role == 1) {
        delete form.license;
        delete form.address;
        delete form.contact;
        delete form.total;
      } else {
        delete form.tiktok_account;
        delete form.cert_number;
      }

      const params = {
        ...form,
        type: role - 0,
        funds: form.funds - 0,
      };

      if (role == 2) {
        params["license"] = newLicense.join(",");
        params["total"] = form.total - 0;
      }

      addFinancial(params)
        .then((res) => {
          if (!res) {
            Toast.fail("新增失败！");
            return;
          }
          Toast.success("新增成功！");
          setTimeout(() => {
            router.push({ name: "application-success" });
          }, 500);
        })
        .finally(() => {
          toast.clear();
        });
    };

    return {
      form,
      target,
      role,
      afterRead,
      checkEmail,
      newLicense,
      onSubmit,
      dataURLtoFileFun,
    };
  },
});
</script>

<style lang="less" scoped>
.application {
  padding: 33px 16px;
  background-color: #f5f5f5;

  .info {
    background: #fff;
    border-radius: 4px;
    margin-bottom: 13px;
    .other-input {
      /deep/ .van-field__value,
      /deep/ .van-cell__value {
        background: #fff;
      }
      /deep/ .van-field__body {
        height: auto;
        padding: 0 10px;
      }

      /deep/ .van-radio__label {
        font-size: 17px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #222222;
      }

      /deep/ .van-radio {
        margin-top: 20px;
      }
    }

    .van-cell {
      flex-direction: column;
      &:first-child {
        padding-top: 16px;
      }
    }
  }

  /deep/ .van-field__label {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #222222;
    letter-spacing: 1px;
    width: 100%;
  }

  /deep/ .van-field__value,
  /deep/ .van-cell__value {
    background: #eff0f5;
    border-radius: 4px;
    margin: 10px 0;
  }

  /deep/ .van-field__body {
    height: 33px;
    padding: 0 10px;
  }

  .btn {
    margin-top: 11px;
    width: 100%;
    border-radius: 4px;
    background: #447cfd;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    height: 51px;
  }
}
</style>
