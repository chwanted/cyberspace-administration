<template>
  <div class="home">
    <section class="instruction">
      <span>服务说明：</span>
      <p>
        如您或您所在机构需要资金支持，请选择身份填写申请表，工作人员将在1个工作日内与您联系，谢谢您的支持。
      </p>
    </section>
    <section class="enterprise banner">
      <img src="@/assets/images/enterprise_back.png" class="apply-image" />
      <div class="explain">
        <span class="enterprise-title title">企业申请</span>
        <van-button
          type="default"
          class="enterprise-btn apply-btn"
          @click="onHandleClick(2)"
          >立即申请</van-button
        >
      </div>
    </section>
    <section class="personal banner">
      <img src="@/assets/images/personal_back.png" class="apply-image" />
      <div class="explain">
        <span class="personal-title title">个人申请</span>
        <van-button
          type="default"
          class="personal-btn apply-btn"
          @click="onHandleClick(1)"
          >立即申请</van-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const onHandleClick = (role) => {
      router.push({
        name: "application",
        query: { role: role },
      });
    };

    return { onHandleClick };
  },
};
</script>

<style lang="less" scoped>
.home {
  background: #fff;
  padding: 29px 23px;
  .instruction {
    color: #222222;
    font-family: Source Han Sans CN;
    span {
      font-size: 23px;
      font-weight: 500;
    }
    p {
      font-size: 15px;
    }
  }
  .personal {
    margin-top: 16px;
  }
  .banner {
    position: relative;
    .explain {
      position: absolute;
      top: 15%;
      left: 7%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
    }
  }

  .title {
    font-size: 21px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    letter-spacing: 5px;
  }
  .enterprise-title {
    color: #124894;
  }
  .personal-title {
    color: #941301;
  }
  .van-button--default {
    border: none;
  }
  .apply-btn {
    margin-top: 20px;
    border-radius: 15px;
    width: 86px;
    height: 30px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 1px;
  }
  .enterprise-btn {
    background: linear-gradient(0deg, #378aff 0%, #378bff 100%);
    box-shadow: 0px 4px 12px 0px rgba(55, 138, 255, 0.63);
  }
  .personal-btn {
    background: #ea623f;
    box-shadow: 0px 4px 12px 0px rgba(230, 56, 33, 0.63);
  }
  .apply-image {
    width: 100%;
    height: auto;
  }
}
</style>
