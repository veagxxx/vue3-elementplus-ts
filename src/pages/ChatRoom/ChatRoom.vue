<template>
  <div class="chat-room" >
    <el-card :style="{ height: height + 'px' }">
      <el-row style="height: 100%;">
        <el-col :span="4" class="room-left">
          <div class="chat-list">

          </div>
        </el-col>
        <el-col :span="20" class="room-right">
          <div class="chat-header">
            <div class="receiver">伊苏尔德</div>
          </div>
          <div class="chat-record" >
            <el-scrollbar ref="scrollbarRef" id="chat-record">
              <div 
                class="record" 
                v-for="(item, index) in records" 
                :key="item.sendTime"
              >
                <div 
                  class="username" 
                  :class="item.sender == currentUser ? 'f-right' : 'f-left'"
                >
                  <span>{{ item.sender }}</span>
                  <!-- <span class="send-time">&nbsp;{{ item.sendTime }}</span> -->
                </div>
                <div 
                  class="message" 
                  :class="item.sender == currentUser ? 'f-right' : 'f-left'"
                  :id="`message${index}`"
                >
                  <span :class="item.sender == currentUser ? 'sender' : 'receiver'">
                    {{ item.message }}
                  </span>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="chat-utils">
            <el-divider></el-divider>
          </div>
          <div class="chat-input">
            <el-input
              v-model="message"
              :rows="5"
              type="textarea"
              resize="none"
              @keyup.enter.prevent="publishMessage"
            />
            <div class="footer">
              <el-popover 
                v-model:visible="messageIsEmpty" 
                placement="top" 
                :auto-close="1"
              >
                <div style="text-align: center;">不能发送空白消息</div>
                <template #reference>
                  <el-button type="text" @click="publishMessage">发送(S)</el-button>
                </template>
              </el-popover>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang='ts' setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { chatRecords } from './config'
import moment from 'moment'
import { ElScrollbar } from 'element-plus';
// 高度
const height = ref<number>(innerHeight - 82)
let message = ref<string>('')
let currentUser = ref<string>('佛耶戈')
let records = ref(chatRecords)
let messageIsEmpty = ref<boolean>(false)
let timer = ref<any>(null)
// 添加 resize 事件
onMounted(() => {
  window.addEventListener('resize', resizeChatRoom)
  nextTick(() => {
    scrollToBottom()
  })
})
// 发送消息
const publishMessage = (): void => {
  if (!message.value.trim().length) {
    messageIsEmpty.value = true
    timer.value = setTimeout(() => {
      messageIsEmpty.value = false
    }, 1000);
    return
  }
  const record = { 
    id: 10, 
    sender: currentUser.value, 
    receiver: '伊苏尔德', 
    sendTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
    message: message.value,
  }
  records.value.push(record)
  console.log('Before nextTick')
  nextTick(() => {
    console.log('nextTick')
    scrollToBottom()
  })
  console.log('After nextTick')
  message.value = ''
}
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
// 聊天记录默认滚动到底部
const scrollToBottom = (): void => {
  const div = <HTMLElement | null>document.getElementById('chat-record')
  scrollbarRef.value!.setScrollTop(div?.scrollHeight as number)
}
// 自适应 ChatRoom 高度
const resizeChatRoom = (): void => {
  height.value = innerHeight - 82
}
// watch(height, (newValue) => {
//   if (newValue) {
//     nextTick(() => {
//       scrollToBottom()
//     })
//   }
// })
// 移除 resize 事件
onUnmounted(() => {
  window.removeEventListener('resize', resizeChatRoom)
  clearTimeout(timer.value)
})
</script>
<style lang='scss' scoped>
  .el-card {
    // height: 100%;
    :deep().el-card__body {
      height: calc( 100% - 40px );
    }
    .room-left {
      border: 1px solid #dcdfe6;
      height: 100%;
    }
    .room-right {
      height: 100%;
      border: 1px solid #dcdfe6;
      border-left: 0;
      .chat-header {
        height: 5%;
        padding: 5px 10px;
        border-bottom: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
      }
      .chat-record {
        height: 60%;
        overflow-y: auto;
        .record {
          padding: 5px 10px;
          .username {
            color: gray;
            font-size: 12px;
            padding: 3px;
            display: flex;
            align-items: center;
          }
          
          .message {
            display: flex;
            align-items: center;
            span {
              padding: 8px;
              border-radius: 3px;
              display: inline-block;
              max-width: 80%;
              font-size: 14px;
            }
          }
          .sender {
            background-color: hotpink;
          }
          .receiver {
            background-color: #dee0e3;
          }
          .f-right {
            justify-content: right;
            padding: 3px 0px;
          }
          .f-left {
            justify-content: left;
            padding: 3px 0px;
          }
        }
      }
      .chat-utils {
        height: 5%;
      }
      .chat-input {
        height: 30%;
        padding: 0px 10px;
        .footer {
          text-align: right;
        }
      }
    }
    
  }
</style>