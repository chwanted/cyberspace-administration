<template>
  <div class="application-success">
    <img src="@/assets/images/pass.png" />
    <div class="success-message">
      <div>提交成功</div>
      <div>客户经理将于24小时内联系您，敬请关注！</div>
    </div>
    <van-button type="primary" class="btn" @click="onHandleClick"
      >关闭</van-button
    >
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const onHandleClick = () => {
      router.push({
        name: "home",
      });
    };

    return { onHandleClick };
  },
};
</script>

<style lang="less" scoped>
.application-success {
  padding-top: 122px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 76px;
    height: auto;
  }

  .success-message {
    font-family: Source Han Sans CN;
    color: #222222;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div:first-child {
      font-size: 24px;
      font-weight: 500;
      margin-top: 49px;
    }
    div:last-child {
      font-size: 18px;
      margin-top: 41px;
      font-weight: 400;
    }
  }

  .btn {
    height: 51px;
    background: #447cfd;
    border-radius: 4px;
    border: none;
    width: 236px;
    margin-top: 45px;
  }
}
</style>
