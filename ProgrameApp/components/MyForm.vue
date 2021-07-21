<template>
  <div class="myform">
    <!-- <van-form @submit="onSubmit"> -->

    <!-- ------------------输入框------------------------ -->
    <template v-for="(item, index) in options">
      <van-field v-if="item.type == 'input'"
                 class="my-cell"
                 :class="[item.class,!!item.isGroup ? 'group' : '',!!item.suffix?'noabsolute':'']"
                 :key="index"
                 :readonly="item.readonly"
                 :rules="item.rule"
                 :input-align="item.inputAlign || 'right'"
                 :type="item.inputType || 'text'"
                 v-bind="item.option"
                 v-model="formData[item.name]"
                 :label-width="item.labelWidth || '6em'"
                 :label="item.title || item.label"
                 :left-icon="item.icon"
                 :placeholder="item.placeholder || '请填写'">
        <template #left-icon>
          <span class="iconfont"
                v-if="item.icon"
                :class="[item.icon, item.iconbgclass]"></span>
        </template>
        <template #right-icon>
          <span v-if="item.suffix"
                class="suffix">{{ item.suffix }}</span>
        </template>
      </van-field>
      <!-- ------------------单项选择------------------------ -->
      <div class="checkBox my-cell"
           :class="['radio-wrap',item.class,!!item.isGroup ? 'group' : '']"
           :key="index"
           v-if="item.type == 'radio'">
        <div class="van-cell van-field__control--right noafter"
             :class="item.class"
             v-if="!!item.header">
          <div class="van-field__label c101010 opacity"
               :class="item.header.class">
            {{ item.header.title }}
          </div>
          <div class="flex flex1 flex-jus-end">
            <div :class="[
                btn.isError ? 'red' : btn.isred?'red':'c101010 opacity',
                'checkBox van-checkbox--horizontal',
              ]"
                 v-for="(btn, bindex) in item.btn"
                 :key="bindex"
                 :style="item.style">
              {{ btn.text||btn.name }}
            </div>
          </div>
        </div>
        <van-field class="c101010"
                   v-bind="item.option"
                   :class="item.class?item.class:'' "
                   v-if="!!item.title"
                   :rules="item.rule"
                   :key="index"
                   :label="item.title"
                   input-align="right">
          <template #input>
            <van-radio-group v-model="formData[item.name]"
                             :disabled="item.readonly"
                             @change="changeRadio(item,formData[item.name])"
                             direction="horizontal">
              <van-radio class="checkBox"
                         :name="btn.name"
                         :style="item.style"
                         v-for="(btn, bindex) in item.btn"
                         :key="bindex"
                         shape="square">{{ btn.label }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div v-if="item.content"
             class="radio-content">{{item.content}}</div>
        <div v-if="formData[item.name]==='1' && item.formOptions"
             class="van-cell childForm">
          <my-form :options="item.formOptions"
                   :formData="formData['_'+item.name]"
                   @watchItem="watchItem1($event)"></my-form>
        </div>
      </div>
      <!-- ------------------文件上传------------------------ -->
      <div :class="[item.class,!!item.isGroup ? 'group' : '']"
           class="bgfff cell my-cell bb"
           :key="index"
           v-if="item.type == 'file'">
        <div class="van-cell van-field__control--right pl0 noafter">
          <div class="van-field__label c101010 " :class="item.option?item.option.required?'redHeart':'':''">
            <span class="iconfont"
                  v-if="item.icon"
                  :class="[item.icon, item.iconbgclass]"></span>
            {{ item.title }}
          </div>
          <div class="flex1"></div>
        </div>
        <van-uploader v-model="formData[item.name]"
                      preview-size="100px"
                      :deletable="fdeletable==true? item.value !==undefined && item.value !==''? false :true : false"
                      :after-read="afterRead"
                      :disabled="item.readonly"
					  :accept="item.accept || 'image/png, image/jpeg'"
                      :max-count="item.maxCount || 3"
                      :max-size="item.maxSize || 10000 * 1024"
                      @before-delete="deleteFile(this,formData[item.name])" />
      </div>
      <!-- ------------------文本框------------------------ -->
      <van-field :class="[
          !!item.isGroup ? 'group' : '',
          !!item.border ? 'hasBorder' : '',
          !!item.horizontal ? '' : 'col-field',
          item.class,
        ]"
                 :key="index"
                 v-if="item.type == 'textarea'"
                 v-model="formData[item.name]"
                 :rules="item.rule"
                 :required="item.rule?true:false"
                 :readonly="item.readonly"
                 class="formTextarea flex-wrap my-cell"
                 type="textarea"
                 :maxlength="item.maxlength || 200 "
                 :show-word-limit="true"
                 v-bind="item.option"
                 :label="item.title"
                 :placeholder="item.placeholder || '请输入'">
        <template #left-icon>
          <span class="iconfont"
                v-if="item.icon"
                :class="[item.icon, item.iconbgclass]"></span>
        </template>
        <template #right-icon>
          <span v-if="item.suffix">{{ item.suffix }}</span>
        </template>
      </van-field>
      <!-- ------------------日期选择------------------------ -->
      <div :key="index"
           :class="[item.class,!!item.isGroup ? 'group' : '']"
           class="my-cell"
           v-show="!item.isShow"
           v-if="item.type == 'date'">
        <van-field :label="item.title"
                   :value="showDate(formData[item.name])"
                   right-icon="arrow"
                   :rules="item.rule"
                   :required="item.rule?true:false"
                   :placeholder="item.placeholder || '请选择'"
                   input-align="right"
                   @click="item.status = true"
                   :readonly="item.readonly">
          <template #right-icon>
            <span class="iconfont icon-you"
                  style="color:#000"></span>
          </template>
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="item.readonly ?'dispayNone':[item.icon, item.iconbgclass]"></span>
          </template>
        </van-field>
        <van-calendar style="height:70%"
                      v-bind="item.option"
                      :disabled="item.readonly"
                      :row-height="55"
                      :default-date="formData[item.name]"
                      @confirm="
            (date) => {
              item.status = false;
              formData[item.name] = date;
            }
          "
                      v-model="item.status" />
      </div>
      <!-- ------------------日期+时分选择------------------------ -->
      <div :key="index"
           :class="[item.class,!!item.isGroup ? 'group' : '']"
           class="my-cell"
           v-show="!item.isShow"
           v-if="item.type == 'dateTimeHM'">
        <van-field :label="item.title"
                   :value="showDateTimeHM(formData[item.name])"
                   right-icon="arrow"
                   :rules="item.rule"
                   :required="item.rule?true:false"
                   :placeholder="item.placeholder || '请选择'"
                   input-align="right"
                   @click="item.status = true"
                   :readonly="item.readonly">
          <template #right-icon>
            <span class="iconfont icon-you"
                  style="color:#ccc"
                  :class="item.readonly ?'dispayNone':''"></span>
          </template>
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="[item.icon, item.iconbgclass]"></span>
          </template>
        </van-field>
        <van-calendar v-bind="item.option"
                      :disabled="item.readonly"
                      :row-height="42"
                      @confirm="
            (date) => {
              item.status = false;
              formData[item.name] = date;
              Tame = true;
            }
          "
                      v-model="item.status" />
        <van-popup v-model="Tame"
                   get-container="body"
                   position="bottom">
          <van-datetime-picker type="time"
                               title="选择时间"
                               @confirm="(dates) => {
                    formData[item.name] = new Date(showDateTimeHM1(formData[item.name]) + ' ' + dates);
                    Tame = false;
                }"
                               @cancel="(can) => {
                    Tame = false;
                }" />
        </van-popup>
      </div>
      <!-- ------------------时间选择------------------------ -->
      <div :key="index"
           :class="[item.class,!!item.isGroup ? 'group' : '']"
           class="my-cell"
           v-if="item.type == 'datetime'">
        <van-field :label="item.title"
                   :rules="item.rule"
                   :value="showDateTime(formData[item.name])"
                   :required="item.rule?true:false"
                   right-icon="arrow"
                   :placeholder="item.placeholder || '请选择'"
                   input-align="right"
                   @click="openstatus(item)"
                   :readonly="item.readonly">
          <template #right-icon>
            <span class="iconfont"
                  style="color:#ccc"
                  :class="!!item.rightIcon ? item.rightIcon : item.readonly ?'dispayNone': 'icon-you'"></span>
          </template>
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="[item.icon, item.iconbgclass]"></span>
          </template>
        </van-field>
        <van-popup v-model="item.status"
                   get-container="body"
                   position="bottom">
          <van-datetime-picker v-bind="item.option"
                               v-model="formData[item.name]"
                               type="datetime"
                               title="选择时间"
                               @confirm="
              (date) => {
                item.status = false;
                
              }
            " />
        </van-popup>
      </div>

      <!-- ------------------选择器------------------------ -->
      <div :key="index"
           class="my-cell myformSelect"
           :class="[item.class,!!item.isGroup ? 'group' : '']"
           v-if="item.type == 'select'">
        <van-field v-if="!item.detail"
                   readonly
                   :rules="item.rule"
                   :required="item.rule?true:false"
                   clickable
                   input-align="right"
                   :name="item.name"
                   right-icon="arrow"
                   :value="showListLabel(item,formData[item.name])"
                   :label="item.title"
                   :placeholder="item.placeholder || '请选择'"
                   @click="item.status = true">
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="[item.icon, item.iconbgclass]"></span>
          </template>
          <template #right-icon>
            <span class="iconfont icon-you"
                  style="color:#ccc"></span>
          </template>
        </van-field>
        <van-field v-if="item.detail"
                   readonly
                   clickable
                   input-align="right"
                   :label="item.title">
          <template #input>
            <span class="selectTag"
                  v-for="(child, index) in formData[item.name]"
                  :key="index">
              {{ child }}
            </span>
          </template>
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="item.icon"></span>
          </template>
          <template #right-icon>
            <span class="iconfont icon-you"
                  style="color:#ccc"></span>
          </template>
        </van-field>
        <van-popup v-model="item.status"
                   position="bottom">
          <van-picker :valueKey="item.valueKey ? item.valueKey : 'text'"
                      show-toolbar
                      :columns="item.columns"
                      @confirm="
              (e) => {
                !!item.confirm&&item.confirm(e,oindex)
                formData[item.name]=e[item.colValue||'value'] ||e;
                $set(formData,formData[item.name],e[item.colValue||'value'] ||e)
                item.status = false;
              }
            "
                      @cancel="item.status = false" />
        </van-popup>
      </div>

      <!-- ------------------多选器------------------------ -->
      <div :key="index"
           class="mulcheckBox my-cell"
           :class="[item.class]"
           v-if="item.type == 'checkBox'">
        <van-field :label="item.title"
                   :rules="item.rule"
                   right-icon="arrow"
                   :placeholder="item.placeholder || '请选择'"
                   input-align="right"
                   @click="openstatus(item)"
                   readonly>
          <template #input>
            <div>
              <span class="cbcbcbc"
                    v-if="!formData[item.name]||formData[item.name].length<=0">{{item.placeholder || '请选择'}}</span>
              <span class="selectTag"
                    v-for="(child, index) in formData[item.name]"
                    :key="index">
                {{ showListLabel(item,child) }}{{formData[item.name].length>index+1?' / ':''}}
              </span>
            </div>
          </template>
          <template #left-icon>
            <span class="iconfont"
                  v-if="item.icon"
                  :class="[item.icon,item.iconbgclass]"></span>
          </template>
          <template #right-icon>
            <span class="iconfont icon-you"
                  style="color:#ccc"></span>
          </template>
        </van-field>
        <van-popup v-model="item.status"
                   overlay-class="checkBoxOverlay"
                   position="bottom"
                   :style="{ height: '100%' }">
          <div class="flex flex-col h100">
            <p class="detailPopTitle">{{item.placeholder||'请选择执行人'}}</p>
            <van-checkbox-group class="flex1 overflwxAuto"
                                v-model="formData[item.name]"
                                direction="horizontal">
              <van-checkbox :name="child[item.colValue||'value']"
                            v-for="(child,cindex) in item.columns"
                            :key="cindex">{{child[item.colLabel||'name']}}</van-checkbox>
            </van-checkbox-group>
            <div class="detailPopBtnBox">
              <div class="detailPopBtn bgfff">
                <div class="sure m0-15 mt15"
                     @click="item.status = false">确定</div>
                <div class="calcen "
                     @click="item.status = false">取消</div>
              </div>
            </div>
          </div>
        </van-popup>
      </div>
      <!-- --------------------空描述--------------------- -->
      <div v-if="item.type == 'group'"
           :class="[
          !!item.isGroup ? 'group' : '',
          item.strong ? 'strongHeader' : item.black ? '' : 'normalHeader',
        ]"
           :key="index"
           class="van-cell noafter">
        {{ formData[item.name] || item.title }}
      </div>

      <!-- --------------------文件多选择------------------------- -->
      <div :key="index"
           v-if="item.type == 'fileselect'"
           :class="[item.class,!!item.isGroup ? 'group' : '']">
        <van-field readonly
                   clickable
                   input-align="right"
                   right-icon="arrow"
                   :label="item.header"
                   :placeholder="item.placeholder || '请选择'">
        </van-field>
        <van-checkbox-group v-model="formData[item.name]">
          <van-cell-group class="fileListBox">
            <transition-group tag="div"
                              name="slide-fade">
              <div class="my-cell pb15"
                   v-for="(child, chindex) in item.btn"
                   :key="child.name"
                   v-show="item.more || (!item.more && chindex < 2)">
                <van-cell class="noafter"
                          :title="child.title">
                  <template #right-icon>
                    <van-checkbox :name="child.name"
                                  shape="square"
                                  ref="checkboxes">
                    </van-checkbox>
                  </template>
                </van-cell>
                <div class="p0-15"
                     v-for="(file, findex) in child.list"
                     :key="findex">
                  <div class="f14 opacity lh24 p0-15">
                    <span class="iconfont icon-anquanjianchabiao"></span>
                    {{ file.text }}
                  </div>
                </div>
              </div>
            </transition-group>
            <div class="text-cen pb15"
                 @click="item.more = !item.more">
              <span class="iconfont icon-z044 f12 rorateAnimate block"
                    :class="item.more ? 'rotate180' : ''"></span>
            </div>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <!-- --------------------表格输入------------------------- -->
      <div class="mytableList my-cell bgfff"
           :class="[item.class,!!item.isGroup ? 'group' : '', 'p0-15']"
           :key="index"
           v-if="item.type == 'gradegourp'">
        <table class="w100 f14">
          <col />
          <col v-if="!item.edit"
               width="60" />
          <col width="80"
               v-if="!item.edit" />
          <col v-if="!item.edit"
               width="30" />
          <thead v-if="item.header">
            <tr>
              <th class="fwnone"
                  align="left">{{ item.header.title }}</th>
              <th class="fwnone"
                  align="left"
                  v-for="(t, i) in item.header.btn"
                  :key="i">{{t.text}}</th>

            </tr>
          </thead>
          <tbody>
            <template v-for="(list, lindex) in item.list">
              <tr :key="lindex"
                  v-if="!item.edit"
                  @click="gradegourpClick($event,list)">
                <template>
                  <td class="my-cell">{{ list.title }}</td>
                  <td class="my-cell">{{ list.total }}</td>
                  <td class="my-cell">
                    <van-stepper min="0"
                                 button-size="22"
                                 integer
                                 max="100"
                                 :default-value="5"
                                 v-model="formData[list.name]" />
                    <!-- <van-field class="p0"
                               v-model="formData[list.name]"
                               clickable
                               type="Number"
                               required
                               :rules="item.rule"
                               :placeholder="item.placeholder || '请输入'">
                    </van-field> -->
                  </td>
                  <td>
                    <van-icon :class="[list.status ? 'rotate180' : '', 'rorateAnimate']"
                              name="arrow-down" />
                  </td>
                </template>

              </tr>
              <template>
                <van-swipe-cell :key="lindex+'index'"
                                class="shipcar">
                  <tr v-if="item.edit">
                    <!-- 日常巡查录入使用 -->
                    <td colspan='2'
                        style="line-height:30px;height:auto">

                      <span @click="openstatus1(item,list)"
                            v-if="list.name">{{list.name}}</span>
                      <span @click="openstatus1(item,list)"
                            v-else
                            style="color:#A3A5A8">请选择车船
                        <van-icon name="arrow"
                                  style="position:relative;top:2px" />
                      </span>
                      <van-popup v-model="list.status"
                                 get-container="body"
                                 position="bottom">
                        <van-picker valueKey="name"
                                    show-toolbar
                                    :columns="carList"
                                    @confirm="
                                (e) => {
                                  list.name=e.name;
                                  list.type = e.type;
                                  list.carShipId = e.id;
                                  list.status = false;
                                }
                              "
                                    @cancel="list.status = false" />
                      </van-popup>

                    </td>

                  </tr>
                  <tr :key="lindex"
                      v-if="item.edit">

                    <td class="my-cell"
                        style="line-height:34px;height:34px">
                      <van-field class="p0"
                                 v-model="list.mileage"
                                 clickable
                                 style="font-size: 12px;"
                                 label="公里数："
                                 :readonly="item.readonly"
                                 :rules="item.rule"
                                 type="number"
                                 :label-width="48"
                                 :placeholder="item.placeholder || '公里数'">
                      </van-field>

                    </td>

                    <td class="my-cell"
                        style="line-height:34px;height:34px;">
                      <van-field class="p0"
                                 style="font-size: 12px;"
                                 v-model="list.useTime"
                                 clickable
                                 :readonly="item.readonly"
                                 label="发动机时长："
                                 type="number"
                                 :label-width="72"
                                 :rules="item.rule"
                                 :placeholder="item.placeholder || '发动机时长'">
                      </van-field>
                    </td>

                  </tr>
                  <template #right
                            v-if="!item.readonly">
                    <van-button square
                                type="danger"
                                text="删除"
                                style="height:100%"
                                @click="()=>{item.list.splice(lindex,1)}" />

                  </template>
                </van-swipe-cell>
              </template>
              <transition-group tag="tr"
                                name="slide-fade"
                                :key="lindex.status">
                <!-- <tr :key="lindex"
                    v-show="!!list.children"> -->
                <td :key="lindex"
                    colspan="4"
                    v-if="list.status">
                  <div>
                    <my-form :options="list.formOptions"
                             :formData="formData['_'+list.name]"></my-form>
                  </div>
                </td>

                <!-- </tr> -->
              </transition-group>
            </template>
            <tr v-if="item.edit && !item.readonly"
                @click="()=>{item.list.push({status:false})}">
              <td colspan="3"
                  style="text-align:center;color:rgba(58, 117, 197, 100);">
                <span class="iconfont icon-riqi"
                      style="color:rgba(58, 117, 197, 100);"></span>

                添加使用记录
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "MyForm",
  props: {
    options: {
      type: Array,
      default: function () {
        return [];
      },
    },
    carList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    formData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    oindex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // activeNames: ["1"],
      form: {
        name: "",
      },
      fdeletable: true,
      fileList: [
        // { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // {
        //   url: "https://img01.yzcdn.cn/vant/sand.jpg",
        //   deletable: true,
        //   beforeDelete: () => {
        //     // Toast('自定义单个预览图片的事件和样式');
        //   },
        // },
      ],
      Tame: false,
    };
  },
  watch: {
    options: function (newv) {
      this.setChildValue(newv)
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {
    this.setChildValue()

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () { },
  computed: {},
  methods: {
    gradegourpClick (e, item) {
      if (e.target.nodeName === "INPUT" || e.target.nodeName === "BUTTON") return;
      item.status = !item.status;
    },
    changeRadio (item, value) {
      let data = item
      item.cvalue = value
      if (item.isWatch) {
        this.$emit('watchItem', data)
      }
    },
    watchItem1 (e) {
      this.$emit('watchItem', e)
    },

    //上传文件
    afterRead (e) {
      let fformData = new FormData();
      fformData.append("file", e.file);
      e.status = 'uploading';
      e.message = '上传中...';
      let upload = axios.create({
        baseURL: '',
        timeout: 10000,
        responseType: 'json',
        headers: {
          'token': 'miaov',
          'content-type': 'multipart/form-data',
        }
      });
      const that = this
      upload.post("http://39.98.195.234:7001/api/harbor/file/upload", fformData).then(res => {
        if (res.status === 200) {
          var fdata = res.data
          if (fdata.code === 0) {
            setTimeout(() => {
              e.status = 'success';
              e.message = '上传成功';
            }, 1000);
            if (fdata.data !== undefined && fdata.data !== '') {
              e.file.filePath = fdata.data.filePath
              that.fileList = e
              console.log(that.fileList)
              return that.fileList
            } else {
              setTimeout(() => {
                e.status = 'failed';
                e.message = '上传失败';
              }, 1000);
            }
          } else {
            setTimeout(() => {
              e.status = 'failed';
              e.message = '上传失败';
            }, 1000);
          }
        } else {
          setTimeout(() => {
            e.status = 'failed';
            e.message = '上传失败';
          }, 1000);
        }
        that.fdeletable = true;
      }).catch(function (er) {
        setTimeout(() => {
          e.status = 'failed';
          e.message = '格式不正确';
        }, 1000);
        that.fdeletable = true;
      })
    },
    //删除文件
    deleteFile (e, model) {
      var num = 0;
      this.fileList.forEach((m, i) => {
        if (m.file.lastModified == e.file.lastModified) {
          num = i
        }
      })
      model.splice(num, 1);
    },

    setChildValue (optionsList) {
      if (!optionsList) {
        optionsList = this.options
      }
      for (let item of optionsList) {
        if (item.formOptions && item.formOptions.length > 0) {
          this.$set(this.formData, '_' + item.name, this.formData['_' + item.name] || {});
        }
        if (item.list) {
          for (const child of item.list) {
            if (child.formOptions && child.formOptions.length > 0 && !this.formData['_' + child.name]) {
              this.$set(this.formData, '_' + child.name, this.formData['_' + child.name] || {});
            }
          }
        }
      }
    },
    openstatus (item) {
      if (item.readonly) return;
      item.status = true
    },
    openstatus1 (item, list) {
      if (item.readonly) return;
      list.status = true
    },
    showListLabel (item, value) {
      if (item.colLabel == "navCnName") {
        console.log(item, value)

      }
      const list = item.columns;
      const collabel = item.colLabel || "name";
      const colvalue = item.colValue || 'value'
      if (!list || !value) return;
      for (const iterator of list) {
        if (iterator[colvalue] == value) {

          return iterator[collabel]
        }
      }
      return ""
    },
    onSubmit () { },
    selectConfirm (e) {
      console.log(e);
    },
    showDateTime (date) {
      if (!date) return "";
      return this.formatDate(date, 'yyyy/MM/dd hh:mm')
    },
    showDateTimeHM (date) {
      if (!date) return "";
      return this.formatDate(date, 'yyyy/MM/dd hh:mm')
    },
    showDateTimeHM1 (date) {
      if (!date) return "";
      return this.formatDate(date, 'yyyy/MM/dd')
    },
    showDate (date) {
      if (!date) return "";

      if (!!date.length && date.length > 0) {
        return this.formatDate(date[0], "yyyy-MM-dd") + "至" + this.formatDate(date[1], "yyyy-MM-dd");
      }
      // console.log(date)
      if (typeof date !== "string") {
        return this.formatDate(date, "yyyy-MM-dd");
      }
      return "";
    },
    formatDate (date, trim) {
      return date.format(trim || "yyyy-MM-dd");
    },
    confirm (e) {
      console.log(e);
    },
  },
};
</script>
<style lang='stylus' scoped>.childForm {
  padding-right: 0;
  background: #F2F2F6;

  .bb {
    border-bottom: none !important;
  }

  .myform {
    overflow-x: hidden;
  }

  .my-cell {
    margin-left: 10px;
  }

  .van-cell, .my-cell, .cell {
    background: #F2F2F6;
    border-bottom: 1px solid #E5E5E5;
    padding: 0 !important;
  }

  .my-cell .van-cell {
    border-bottom: none !important;
    padding: 10px 0 !important;
  }
}

.my-cell {
  position: relative;
}

.my-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid rgba(237, 238, 238, 100);
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}

td.my-cell::after {
  transform: none;
  left: 0;
  right: 0;
}

>>> .my-cell-pr20 .van-field__control.van-field__control--right {
  padding-right: 20px;
}

.myform {
  .cbcbcbc{
    color:#bcbcbc;
  }
  .filedIconBox {
    color: white;
    border-radius: 3px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    display: inline-block;
    text-align: center;
  }

  .mytableList {
    thead::before {
      content: ' ';
      display: block;
      height: 10px;
    }

    thead {
      tr {
        height: 30px;
        line-height: 30px;
      }
    }

    tbody {
      td {
        height: 56px;
        line-height: 56px;
      }
    }
  }

  .myformSelect {
    .selectTag {
      border-radius: 3px;
      background-color: rgba(242, 242, 242, 100);
      color: rgba(51, 51, 51, 100);
      font-size: 12px;
      border: 1px solid rgba(218, 214, 214, 100);
      padding: 0 5px;
      line-height: 16px;
      margin-left: 5px;
    }
  }

  width: 100%;

  .cell {
    padding: 10px 16px;
  }

  .group {
    margin-top: 8px;
  }

  .before::before {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    top: 0;
    left: 16px;
    border-bottom: 1px solid rgba(237, 238, 238, 100);
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    z-index: 10;
  }

  .noafter::after {
    display: none;
  }

  .checkBox {
    min-width: 60px;
    text-align: left;
    margin-bottom: 4px;
  }

  .strongHeader {
    font-size: 16px;
    font-weight: 600;
  }

  .normalHeader {
    color: #9CA3A5A8;
  }
}

>>> {
  /* .van-image__img:nth-child(3n){
   margint:0 0 8px 0;
  } */
  .van-field__left-icon {
    margin-right: 8px;
  }

  .mulcheckBox {
    .van-popup {
      box-sizing: border-box;
      padding: 15px;
    }

    justify-content: space-between;

    .detailPopBtnBox {
      height: 142px;
    }

    .detailPopBtn {
      background-color: white;
      padding-bottom: 52px;
    }

    .calcen {
      margin-top: 5px;
      color: gray;
    }

    .van-icon-success {
      display: none;
    }

    .van-checkbox-group {
      justify-content: space-between;
      align-content: flex-start;
    }

    .van-checkbox {
      text-align: center;
      justify-content: center;
      border: 1px solid #3A75C5;
      border-radius: 3px;
      padding: 0 10px;
      min-width: 75px;
      height: 32px;
      margin-bottom: 15px;
      margin-right: 0;
    }

    .van-checkbox__label {
      margin-left: 0;
      color: #3A75C5;
    }

    [aria-checked=true] {
      background-color: #3A75C5;

      .van-checkbox__label {
        color: white;
      }
    }
  }

  .formTextarea.col-field {
    .van-cell__value.van-field__value {
      width: 100%;
      flex: initial;
      -webkit-bot-flex: initial;
      -webkit-flex: initial;
    }
  }

  .hasBorder {
    textarea {
      border: 1px solid rgba(237, 238, 238, 100);
    }
  }

  .van-field__label {
    color: #101010;
  }
}

.iconfont {
  width: 26px;
  color: #fff;
  border-radius: 3px;
  display: inline-block;
  height: 25px;
  text-align: center;
}

.r0 {
  margin-right: 0 !important;
}

.red {
  color: #BD3C3C;
}

.radio-content {
  background: #fff;
  padding: 10px 16px;
  color: #736D6D;
  line-height: 20px;
}

.bb {
  border-bottom: none;
}

.wrap .van-cell {
  display: block;

  .van-field__label {
    margin-bottom: 10px;
  }
}

.van-field__control--custom {
  display: block !important;
}

.redHeart::after {
  color: #ee0a24;
  font-size: 14px;
  content: '*';
  position: absolute;
  left: 59px;
}

.dispayNone {
  display: none;
}

.van-calendar__popup.van-popup--bottom, .van-calendar__popup.van-popup--top {
  height: 55%;
}
</style>
<style>
.van-field__label {
  width: auto;
}
.width-15 .van-field__label {
  max-width: 13em;
}
</style>