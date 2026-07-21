import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {resolveComponent:_resolveComponent,createVNode:_createVNode,createElementVNode:_createElementVNode,withCtx:_withCtx,toDisplayString:_toDisplayString,createTextVNode:_createTextVNode,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,mergeProps:_mergeProps,createElementBlock:_createElementBlock,withModifiers:_withModifiers} = await importShared('vue');


const _hoisted_1 = { class: "plugin-config" };
const _hoisted_2 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_3 = { class: "setting-content flex-grow-1" };
const _hoisted_4 = { class: "d-flex justify-space-between align-center" };
const _hoisted_5 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_6 = { class: "setting-content flex-grow-1" };
const _hoisted_7 = { class: "d-flex justify-space-between align-center" };
const _hoisted_8 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_9 = { class: "setting-content flex-grow-1" };
const _hoisted_10 = { class: "d-flex justify-space-between align-center" };
const _hoisted_11 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_12 = { class: "setting-content flex-grow-1" };
const _hoisted_13 = { class: "d-flex justify-space-between align-center" };
const _hoisted_14 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_15 = { class: "setting-content flex-grow-1" };
const _hoisted_16 = { class: "d-flex justify-space-between align-center" };
const _hoisted_17 = { class: "d-flex align-center" };
const _hoisted_18 = { class: "d-flex align-center flex-row ga-2" };
const _hoisted_19 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_20 = { class: "setting-content flex-grow-1" };
const _hoisted_21 = { class: "d-flex justify-space-between align-center" };
const _hoisted_22 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_23 = { class: "setting-content flex-grow-1" };
const _hoisted_24 = { class: "d-flex justify-space-between align-center" };
const _hoisted_25 = {
  key: 0,
  class: "d-flex align-center mt-2",
  style: {"gap":"12px"}
};
const _hoisted_26 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_27 = { class: "setting-content flex-grow-1" };
const _hoisted_28 = { class: "d-flex justify-space-between align-center" };
const _hoisted_29 = { class: "setting-item d-flex align-center py-2" };
const _hoisted_30 = { class: "setting-content flex-grow-1" };
const _hoisted_31 = { class: "d-flex justify-space-between align-center" };

const {ref,reactive,onMounted} = await importShared('vue');



const _sfc_main = {
  __name: 'Config',
  props: {
  api: { 
    type: [Object, Function],
    required: true,
  },
  initialConfig: {
    type: Object,
    default: () => ({}),
  }
},
  emits: ['close', 'switch', 'config-updated-on-server', 'save'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const form = ref(null);
const isFormValid = ref(true);
const error = ref(null);
const successMessage = ref(null);
const saving = ref(false);
const testingApi = ref(false);
const apiTestResult = ref(null);
const initialConfigLoaded = ref(false);

// Holds the config as fetched from server, used for reset
const serverFetchedConfig = reactive({}); 

// Holds the config being edited in the form
const editableConfig = reactive({
  enable: false,
  width: 1920,
  height: 1080,
  fontsize: 50,
  alpha: 0.9,
  duration: 15,
  path: '',
  useTmdbID: true,
  auto_scrape: true,
  enable_retry_task: true,
  screen_area: 'full',
  enable_strm: true,
  danmu_api_url: 'http://localhost:9321',
  enable_multi_layer: false,
  random_top_bottom: false,
  top_ratio: 0,
  bottom_ratio: 0,
  density: 100,
  width_scale: 1.0
});

const getPluginId = () => {
  return "DanmuTV";
};

async function loadInitialData() {
  error.value = null;
  saving.value = true;
  initialConfigLoaded.value = false;
  
  try {
    const pluginId = getPluginId();
    if (!pluginId) ;
    
    const data = await props.api.get(`plugin/${pluginId}/config`);
    
    if (data) {
      // 更新服务器配置
      Object.assign(serverFetchedConfig, JSON.parse(JSON.stringify(data)));
      // 更新编辑中的配置
      Object.assign(editableConfig, {
          enable: data.enabled,
          width: data.width,
          height: data.height,
          fontsize: data.fontsize,
          alpha: data.alpha,
          duration: data.duration,
          path: data.path,
          useTmdbID: data.useTmdbID,
          auto_scrape: data.auto_scrape,
          enable_retry_task: data.enable_retry_task,
          screen_area: data.screen_area,
          enable_strm: data.enable_strm,
          danmu_api_url: data.danmu_api_url || 'http://localhost:9321',
          enable_multi_layer: data.enable_multi_layer || false,
          random_top_bottom: data.random_top_bottom || false,
          top_ratio: data.top_ratio || 0,
          bottom_ratio: data.bottom_ratio || 0,
          density: data.density ?? 100,
          width_scale: data.width_scale ?? 1.0
        });
      initialConfigLoaded.value = true;
      successMessage.value = '成功加载配置';
    } else {
      throw new Error('加载配置失败');
    }
  } catch (err) {
    console.error('加载配置失败:', err);
    error.value = err.message || '加载配置失败，请检查网络或API';
    // 使用初始配置
    if (props.initialConfig) {
      Object.assign(serverFetchedConfig, JSON.parse(JSON.stringify(props.initialConfig)));
      Object.assign(editableConfig, {
        enable: props.initialConfig.enabled,
        width: props.initialConfig.width,
        height: props.initialConfig.height,
        fontsize: props.initialConfig.fontsize,
        alpha: props.initialConfig.alpha,
        duration: props.initialConfig.duration,
        path: props.initialConfig.path,
        useTmdbID: props.initialConfig.useTmdbID,
        auto_scrape: props.initialConfig.auto_scrape,
        enable_retry_task: props.initialConfig.enable_retry_task,
        screen_area: props.initialConfig.screen_area,
        enable_strm: props.initialConfig.enable_strm,
        danmu_api_url: props.initialConfig.danmu_api_url || 'http://localhost:9321',
        enable_multi_layer: props.initialConfig.enable_multi_layer || false,
        random_top_bottom: props.initialConfig.random_top_bottom || false,
      top_ratio: props.initialConfig.top_ratio || 0,
      bottom_ratio: props.initialConfig.bottom_ratio || 0,
      density: props.initialConfig.density ?? 100,
      width_scale: props.initialConfig.width_scale ?? 1.0
      });
    }
    successMessage.value = null;
  } finally {
    saving.value = false;
    setTimeout(() => { successMessage.value = null; error.value = null; }, 4000);
  }
}

async function testApiConnection() {
  if (!editableConfig.danmu_api_url) return;
  testingApi.value = true;
  apiTestResult.value = null;
  try {
    const res = await props.api.get(`plugin/${getPluginId()}/api_status`, {
      params: { api_url: editableConfig.danmu_api_url }
    });
    if (res && res.success) {
      apiTestResult.value = { ok: true, message: res.message || 'API连接成功' };
    } else {
      apiTestResult.value = { ok: false, message: res?.message || 'API连接失败' };
    }
  } catch (err) {
    apiTestResult.value = { ok: false, message: err?.message || 'API检测请求失败' };
  } finally {
    testingApi.value = false;
    setTimeout(() => { if (apiTestResult.value?.ok) apiTestResult.value = null; }, 5000);
  }
}

async function saveFullConfig() {
  error.value = null;
  successMessage.value = null;
  if (!form.value) return;
  
  const validation = await form.value.validate();
  if (!validation.valid) {
    error.value = '请检查表单中的错误';
    return;
  }

  saving.value = true;

  try {
    const pluginId = getPluginId();
    if (!pluginId) ;

    // 转换配置格式
    const configToSave = {
      enabled: editableConfig.enable,
      width: editableConfig.width,
      height: editableConfig.height,
      fontsize: editableConfig.fontsize,
      alpha: editableConfig.alpha,
      duration: editableConfig.duration,
      path: editableConfig.path,
      useTmdbID: editableConfig.useTmdbID,
      auto_scrape: editableConfig.auto_scrape,
      enable_retry_task: editableConfig.enable_retry_task,
      screen_area: editableConfig.screen_area,
      enable_strm: editableConfig.enable_strm,
      danmu_api_url: editableConfig.danmu_api_url,
      enable_multi_layer: editableConfig.enable_multi_layer,
      random_top_bottom: editableConfig.random_top_bottom,
      top_ratio: editableConfig.top_ratio,
      bottom_ratio: editableConfig.bottom_ratio,
      density: editableConfig.density,
      width_scale: editableConfig.width_scale
    };

    // 发送保存请求
    const result = await props.api.post(`plugin/${pluginId}/config`, configToSave);
    
    if (result && result.success) {
      // 更新服务器配置
      Object.assign(serverFetchedConfig, JSON.parse(JSON.stringify(configToSave)));
      successMessage.value = '配置已保存';
      emit('config-updated-on-server');
    } else {
      throw new Error(result?.message || '保存配置失败');
    }
  } catch (err) {
    console.error('保存配置失败:', err);
    error.value = err.message || '保存配置失败，请检查网络或查看日志';
  } finally {
    saving.value = false;
    setTimeout(() => { 
      successMessage.value = null; 
      if (error.value && !error.value.startsWith('保存配置失败') && !error.value.startsWith('配置已部分保存')) { 
        error.value = null; 
      }
    }, 5000); 
  }
}

function resetConfigToFetched() {
  if (initialConfigLoaded.value) {
    Object.assign(editableConfig, {
        enable: serverFetchedConfig.enabled,
        width: serverFetchedConfig.width,
        height: serverFetchedConfig.height,
        fontsize: serverFetchedConfig.fontsize,
        alpha: serverFetchedConfig.alpha,
        duration: serverFetchedConfig.duration,
        path: serverFetchedConfig.path,
        useTmdbID: serverFetchedConfig.useTmdbID,
        auto_scrape: serverFetchedConfig.auto_scrape,
        enable_retry_task: serverFetchedConfig.enable_retry_task,
        screen_area: serverFetchedConfig.screen_area,
        enable_strm: serverFetchedConfig.enable_strm,
        danmu_api_url: serverFetchedConfig.danmu_api_url || 'http://localhost:9321',
        enable_multi_layer: serverFetchedConfig.enable_multi_layer || false,
        random_top_bottom: serverFetchedConfig.random_top_bottom || false,
        top_ratio: serverFetchedConfig.top_ratio || 0,
        bottom_ratio: serverFetchedConfig.bottom_ratio || 0,
        density: serverFetchedConfig.density ?? 100
      });
    error.value = null;
    successMessage.value = '配置已重置为上次加载的状态';
    if (form.value) form.value.resetValidation();
  } else {
    error.value = '重置失败';
  }
  setTimeout(() => { successMessage.value = null; error.value = null; }, 3000);
}

onMounted(() => {
  // 初始化时使用初始配置
  if (props.initialConfig) {
    Object.assign(serverFetchedConfig, JSON.parse(JSON.stringify(props.initialConfig)));
    Object.assign(editableConfig, {
      enable: props.initialConfig.enabled,
      width: props.initialConfig.width,
      height: props.initialConfig.height,
      fontsize: props.initialConfig.fontsize,
      alpha: props.initialConfig.alpha,
      duration: props.initialConfig.duration,
      path: props.initialConfig.path,
      useTmdbID: props.initialConfig.useTmdbID,
      auto_scrape: props.initialConfig.auto_scrape,
      enable_retry_task: props.initialConfig.enable_retry_task,
      screen_area: props.initialConfig.screen_area,
      enable_strm: props.initialConfig.enable_strm,
      danmu_api_url: props.initialConfig.danmu_api_url || 'http://localhost:9321'
    });
  }
  loadInitialData();
});

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent("v-icon");
  const _component_v_card_title = _resolveComponent("v-card-title");
  const _component_v_alert = _resolveComponent("v-alert");
  const _component_v_switch = _resolveComponent("v-switch");
  const _component_v_col = _resolveComponent("v-col");
  const _component_v_btn = _resolveComponent("v-btn");
  const _component_v_tooltip = _resolveComponent("v-tooltip");
  const _component_v_text_field = _resolveComponent("v-text-field");
  const _component_v_row = _resolveComponent("v-row");
  const _component_v_card_text = _resolveComponent("v-card-text");
  const _component_v_card = _resolveComponent("v-card");
  const _component_v_select = _resolveComponent("v-select");
  const _component_v_textarea = _resolveComponent("v-textarea");
  const _component_v_form = _resolveComponent("v-form");
  const _component_v_divider = _resolveComponent("v-divider");
  const _component_v_spacer = _resolveComponent("v-spacer");
  const _component_v_card_actions = _resolveComponent("v-card-actions");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_v_card, {
      flat: "",
      class: "rounded border"
    }, {
      default: _withCtx(() => [
        _createVNode(_component_v_card_title, { class: "text-subtitle-1 d-flex align-center px-3 py-2 bg-primary-lighten-5" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_icon, {
              icon: "mdi-cog",
              class: "mr-2",
              color: "primary",
              size: "small"
            }),
            _cache[21] || (_cache[21] = _createElementVNode("span", null, "影视弹幕刮削配置", -1))
          ]),
          _: 1
        }),
        _createVNode(_component_v_card_text, { class: "px-3 py-2" }, {
          default: _withCtx(() => [
            (error.value)
              ? (_openBlock(), _createBlock(_component_v_alert, {
                  key: 0,
                  type: "error",
                  density: "compact",
                  class: "mb-2 text-caption",
                  variant: "tonal",
                  closable: ""
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(error.value), 1)
                  ]),
                  _: 1
                }))
              : _createCommentVNode("", true),
            (successMessage.value)
              ? (_openBlock(), _createBlock(_component_v_alert, {
                  key: 1,
                  type: "success",
                  density: "compact",
                  class: "mb-2 text-caption",
                  variant: "tonal",
                  closable: ""
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(successMessage.value), 1)
                  ]),
                  _: 1
                }))
              : _createCommentVNode("", true),
            _createVNode(_component_v_form, {
              ref_key: "form",
              ref: form,
              modelValue: isFormValid.value,
              "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((isFormValid).value = $event)),
              onSubmit: _withModifiers(saveFullConfig, ["prevent"])
            }, {
              default: _withCtx(() => [
                _createVNode(_component_v_card, {
                  flat: "",
                  class: "rounded mb-3 border config-card"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_title, { class: "text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_icon, {
                          icon: "mdi-tune",
                          class: "mr-2",
                          color: "primary",
                          size: "small"
                        }),
                        _cache[22] || (_cache[22] = _createElementVNode("span", null, "基本设置", -1))
                      ]),
                      _: 1
                    }),
                    _createVNode(_component_v_card_text, { class: "px-3 py-2" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_row, null, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_2, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-power",
                                    size: "small",
                                    color: editableConfig.enable ? 'success' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_3, [
                                    _createElementVNode("div", _hoisted_4, [
                                      _cache[23] || (_cache[23] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "启用插件"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "是否启用弹幕刮削功能")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.enable,
                                        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((editableConfig.enable) = $event)),
                                        color: "primary",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_5, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-database",
                                    size: "small",
                                    color: editableConfig.useTmdbID ? 'info' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_6, [
                                    _createElementVNode("div", _hoisted_7, [
                                      _cache[24] || (_cache[24] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "使用TMDB ID"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "是否使用TMDB ID进行匹配")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.useTmdbID,
                                        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((editableConfig.useTmdbID) = $event)),
                                        color: "info",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_8, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-auto-fix",
                                    size: "small",
                                    color: editableConfig.auto_scrape ? 'success' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_9, [
                                    _createElementVNode("div", _hoisted_10, [
                                      _cache[25] || (_cache[25] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "入库自动刮削"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "是否在媒体入库时自动刮削弹幕")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.auto_scrape,
                                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((editableConfig.auto_scrape) = $event)),
                                        color: "success",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_11, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-repeat",
                                    size: "small",
                                    color: editableConfig.enable_retry_task ? 'warning' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_12, [
                                    _createElementVNode("div", _hoisted_13, [
                                      _cache[26] || (_cache[26] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "启用重试任务"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "弹幕数量不足时自动加入重试列表")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.enable_retry_task,
                                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((editableConfig.enable_retry_task) = $event)),
                                        color: "warning",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_14, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-file-video-outline",
                                    size: "small",
                                    color: editableConfig.enable_strm ? 'info' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_15, [
                                    _createElementVNode("div", _hoisted_16, [
                                      _createElementVNode("div", _hoisted_17, [
                                        _cache[28] || (_cache[28] = _createElementVNode("div", null, [
                                          _createElementVNode("div", { class: "text-subtitle-2" }, "启用STRM文件刮削"),
                                          _createElementVNode("div", { class: "text-caption text-grey" }, "是否支持.strm流媒体文件的弹幕刮削")
                                        ], -1)),
                                        _createVNode(_component_v_tooltip, { location: "top" }, {
                                          activator: _withCtx(({ props }) => [
                                            _createVNode(_component_v_btn, _mergeProps(props, {
                                              icon: "mdi-help-circle-outline",
                                              size: "x-small",
                                              variant: "text",
                                              color: "grey",
                                              class: "ml-2"
                                            }), null, 16)
                                          ]),
                                          default: _withCtx(() => [
                                            _cache[27] || (_cache[27] = _createElementVNode("div", { class: "tooltip-content" }, [
                                              _createElementVNode("div", { class: "text-subtitle-2 mb-1" }, "STRM文件刮削说明"),
                                              _createElementVNode("div", { class: "text-caption" }, [
                                                _createElementVNode("div", { class: "mb-1" }, [
                                                  _createElementVNode("strong", null, "功能限制：")
                                                ]),
                                                _createElementVNode("div", null, "• 仅支持TMDB ID匹配，无法使用文件hash"),
                                                _createElementVNode("div", null, "• 无法提取内嵌字幕，仅支持外部字幕"),
                                                _createElementVNode("div", null, "• 使用默认分辨率(1920x1080)"),
                                                _createElementVNode("div", { class: "mt-2 mb-1" }, [
                                                  _createElementVNode("strong", null, "使用条件：")
                                                ]),
                                                _createElementVNode("div", null, "• 文件名需包含正确的媒体信息"),
                                                _createElementVNode("div", null, "• MoviePilot能够识别并获取TMDB ID"),
                                                _createElementVNode("div", null, "• 弹幕API后端需要有对应弹幕资源")
                                              ])
                                            ], -1))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.enable_strm,
                                        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((editableConfig.enable_strm) = $event)),
                                        color: "info",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, { cols: "12" }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_18, [
                                  _createVNode(_component_v_text_field, {
                                    modelValue: editableConfig.danmu_api_url,
                                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((editableConfig.danmu_api_url) = $event)),
                                    label: "弹幕API地址",
                                    variant: "outlined",
                                    placeholder: "http://localhost:9321/{TOKEN}",
                                    hint: "弹幕API后端地址",
                                    "persistent-hint": "",
                                    "prepend-inner-icon": "mdi-web",
                                    disabled: saving.value || testingApi.value,
                                    density: "compact",
                                    class: "text-caption flex-grow-1"
                                  }, null, 8, ["modelValue", "disabled"]),
                                  _createVNode(_component_v_btn, {
                                    color: "secondary",
                                    variant: "tonal",
                                    size: "small",
                                    loading: testingApi.value,
                                    disabled: saving.value || testingApi.value || !editableConfig.danmu_api_url,
                                    onClick: testApiConnection,
                                    "prepend-icon": "mdi-connection"
                                  }, {
                                    default: _withCtx(() => [...(_cache[29] || (_cache[29] = [
                                      _createTextVNode(" 测试连接 ", -1)
                                    ]))]),
                                    _: 1
                                  }, 8, ["loading", "disabled"])
                                ]),
                                (apiTestResult.value)
                                  ? (_openBlock(), _createBlock(_component_v_alert, {
                                      key: 0,
                                      type: apiTestResult.value.ok ? 'success' : 'error',
                                      density: "compact",
                                      variant: "tonal",
                                      class: "mt-1 text-caption",
                                      closable: "",
                                      "onClick:close": _cache[6] || (_cache[6] = $event => (apiTestResult.value = null))
                                    }, {
                                      default: _withCtx(() => [
                                        _createTextVNode(_toDisplayString(apiTestResult.value.message), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["type"]))
                                  : _createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card, {
                  flat: "",
                  class: "rounded mb-3 border config-card"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_title, { class: "text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_icon, {
                          icon: "mdi-video",
                          class: "mr-2",
                          color: "primary",
                          size: "small"
                        }),
                        _cache[30] || (_cache[30] = _createElementVNode("span", null, "弹幕参数设置", -1))
                      ]),
                      _: 1
                    }),
                    _createVNode(_component_v_card_text, { class: "px-3 py-2" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_row, null, {
                          default: _withCtx(() => [
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createVNode(_component_v_text_field, {
                                  modelValue: editableConfig.fontsize,
                                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((editableConfig.fontsize) = $event)),
                                  modelModifiers: { number: true },
                                  label: "字体大小",
                                  type: "number",
                                  variant: "outlined",
                                  min: 1,
                                  rules: [v => v > 0 || '字体大小必须大于0'],
                                  hint: "弹幕字体大小",
                                  "persistent-hint": "",
                                  "prepend-inner-icon": "mdi-format-font-size-increase",
                                  disabled: saving.value,
                                  density: "compact",
                                  class: "text-caption"
                                }, null, 8, ["modelValue", "rules", "disabled"])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createVNode(_component_v_select, {
                                  modelValue: editableConfig.screen_area,
                                  "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((editableConfig.screen_area) = $event)),
                                  label: "弹幕显示区域",
                                  variant: "outlined",
                                  items: [
                      { title: '全屏弹幕', value: 'full' },
                      { title: '半屏弹幕', value: 'half' },
                      { title: '1/3屏弹幕', value: 'third' },
                      { title: '1/4屏弹幕', value: 'quarter' }
                    ],
                                  hint: "选择弹幕显示的屏幕区域，超出区域的弹幕将被忽略",
                                  "persistent-hint": "",
                                  "prepend-inner-icon": "mdi-monitor",
                                  disabled: saving.value,
                                  density: "compact",
                                  class: "text-caption"
                                }, null, 8, ["modelValue", "disabled"])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createVNode(_component_v_text_field, {
                                  modelValue: editableConfig.alpha,
                                  "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((editableConfig.alpha) = $event)),
                                  modelModifiers: { number: true },
                                  label: "透明度",
                                  type: "number",
                                  variant: "outlined",
                                  min: 0,
                                  max: 1,
                                  step: 0.1,
                                  rules: [v => v >= 0 && v <= 1 || '透明度必须在0-1之间'],
                                  hint: "弹幕透明度(0-1)",
                                  "persistent-hint": "",
                                  "prepend-inner-icon": "mdi-opacity",
                                  disabled: saving.value,
                                  density: "compact",
                                  class: "text-caption"
                                }, null, 8, ["modelValue", "rules", "disabled"])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createVNode(_component_v_text_field, {
                                  modelValue: editableConfig.duration,
                                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((editableConfig.duration) = $event)),
                                  modelModifiers: { number: true },
                                  label: "持续时间",
                                  type: "number",
                                  variant: "outlined",
                                  min: 1,
                                  rules: [v => v > 0 || '持续时间必须大于0'],
                                  hint: "弹幕显示持续时间(秒)",
                                  "persistent-hint": "",
                                  "prepend-inner-icon": "mdi-clock-outline",
                                  disabled: saving.value,
                                  density: "compact",
                                  class: "text-caption"
                                }, null, 8, ["modelValue", "rules", "disabled"])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_19, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-layers",
                                    size: "small",
                                    color: editableConfig.enable_multi_layer ? 'primary' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_20, [
                                    _createElementVNode("div", _hoisted_21, [
                                      _cache[31] || (_cache[31] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "启用多层弹幕"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "开启后弹幕分为三层，具有不同速度和透明度，营造深度感")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.enable_multi_layer,
                                        "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((editableConfig.enable_multi_layer) = $event)),
                                        color: "primary",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_22, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-format-vertical-align-top",
                                    size: "small",
                                    color: editableConfig.random_top_bottom ? 'primary' : 'grey',
                                    class: "mr-3"
                                  }, null, 8, ["color"]),
                                  _createElementVNode("div", _hoisted_23, [
                                    _createElementVNode("div", _hoisted_24, [
                                      _cache[32] || (_cache[32] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "随机顶/底部弹幕"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "从滚动弹幕中随机分配比例转为悬停弹幕（最大10%）")
                                      ], -1)),
                                      _createVNode(_component_v_switch, {
                                        modelValue: editableConfig.random_top_bottom,
                                        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((editableConfig.random_top_bottom) = $event)),
                                        color: "primary",
                                        inset: "",
                                        disabled: saving.value,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "small-switch"
                                      }, null, 8, ["modelValue", "disabled"])
                                    ]),
                                    (editableConfig.random_top_bottom)
                                      ? (_openBlock(), _createElementBlock("div", _hoisted_25, [
                                          _createVNode(_component_v_text_field, {
                                            modelValue: editableConfig.top_ratio,
                                            "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((editableConfig.top_ratio) = $event)),
                                            modelModifiers: { number: true },
                                            label: "顶部比例",
                                            type: "number",
                                            density: "compact",
                                            variant: "outlined",
                                            "hide-details": "",
                                            min: 0,
                                            max: 10,
                                            step: 1,
                                            suffix: "%",
                                            style: {"max-width":"130px"},
                                            disabled: saving.value
                                          }, null, 8, ["modelValue", "disabled"]),
                                          _createVNode(_component_v_text_field, {
                                            modelValue: editableConfig.bottom_ratio,
                                            "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((editableConfig.bottom_ratio) = $event)),
                                            modelModifiers: { number: true },
                                            label: "底部比例",
                                            type: "number",
                                            density: "compact",
                                            variant: "outlined",
                                            "hide-details": "",
                                            min: 0,
                                            max: 10,
                                            step: 1,
                                            suffix: "%",
                                            style: {"max-width":"130px"},
                                            disabled: saving.value
                                          }, null, 8, ["modelValue", "disabled"])
                                        ]))
                                      : _createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_26, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-chart-bell-curve",
                                    size: "small",
                                    color: "grey",
                                    class: "mr-3"
                                  }),
                                  _createElementVNode("div", _hoisted_27, [
                                    _createElementVNode("div", _hoisted_28, [
                                      _cache[33] || (_cache[33] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "弹幕密度"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "随机保留指定比例的弹幕，降低可减少拥挤（100%为全部保留）")
                                      ], -1)),
                                      _createVNode(_component_v_text_field, {
                                        modelValue: editableConfig.density,
                                        "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((editableConfig.density) = $event)),
                                        modelModifiers: { number: true },
                                        type: "number",
                                        density: "compact",
                                        variant: "outlined",
                                        "hide-details": "",
                                        min: 10,
                                        max: 100,
                                        step: 5,
                                        suffix: "%",
                                        style: {"max-width":"130px"},
                                        disabled: saving.value
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            _createVNode(_component_v_col, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: _withCtx(() => [
                                _createElementVNode("div", _hoisted_29, [
                                  _createVNode(_component_v_icon, {
                                    icon: "mdi-arrow-expand-horizontal",
                                    size: "small",
                                    color: "grey",
                                    class: "mr-3"
                                  }),
                                  _createElementVNode("div", _hoisted_30, [
                                    _createElementVNode("div", _hoisted_31, [
                                      _cache[34] || (_cache[34] = _createElementVNode("div", null, [
                                        _createElementVNode("div", { class: "text-subtitle-2" }, "弹幕宽度扩展"),
                                        _createElementVNode("div", { class: "text-caption text-grey" }, "扩大弹幕显示区域宽度，解决超宽屏/手机屏左右空白问题")
                                      ], -1)),
                                      _createVNode(_component_v_select, {
                                        modelValue: editableConfig.width_scale,
                                        "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((editableConfig.width_scale) = $event)),
                                        modelModifiers: { number: true },
                                        density: "compact",
                                        variant: "outlined",
                                        "hide-details": "",
                                        items: [
                            { title: '1.0x (标准)', value: 1.0 },
                            { title: '1.1x', value: 1.1 },
                            { title: '1.2x', value: 1.2 },
                            { title: '1.3x', value: 1.3 },
                            { title: '1.4x', value: 1.4 },
                            { title: '1.5x', value: 1.5 },
                            { title: '1.6x', value: 1.6 },
                            { title: '1.7x', value: 1.7 },
                            { title: '1.8x', value: 1.8 },
                            { title: '1.9x', value: 1.9 },
                            { title: '2.0x', value: 2.0 }
                          ],
                                        "item-title": "title",
                                        "item-value": "value",
                                        style: {"max-width":"150px"},
                                        disabled: saving.value
                                      }, null, 8, ["modelValue", "disabled"])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card, {
                  flat: "",
                  class: "rounded mb-3 border config-card"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_title, { class: "text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_icon, {
                          icon: "mdi-folder",
                          class: "mr-2",
                          color: "primary",
                          size: "small"
                        }),
                        _cache[35] || (_cache[35] = _createElementVNode("span", null, "手动控制媒体库路径", -1))
                      ]),
                      _: 1
                    }),
                    _createVNode(_component_v_card_text, { class: "px-3 py-2" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_textarea, {
                          modelValue: editableConfig.path,
                          "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((editableConfig.path) = $event)),
                          label: "/",
                          variant: "outlined",
                          hint: "每行一个路径,在状态页手动控制刮削",
                          "persistent-hint": "",
                          "prepend-inner-icon": "mdi-folder-multiple",
                          disabled: saving.value,
                          density: "compact",
                          class: "text-caption",
                          rows: "3"
                        }, null, 8, ["modelValue", "disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_card, {
                  flat: "",
                  class: "rounded mb-3 border config-card"
                }, {
                  default: _withCtx(() => [
                    _createVNode(_component_v_card_text, { class: "d-flex align-center px-3 py-2" }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_icon, {
                          icon: "mdi-information",
                          color: "info",
                          class: "mr-2",
                          size: "small"
                        }),
                        _cache[36] || (_cache[36] = _createElementVNode("span", { class: "text-caption" }, " 此插件用于生成影视弹幕字幕文件，支持电视剧、电影、动漫等多种媒体类型。弹幕来源为自定义弹幕API后端。 ", -1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }),
        _createVNode(_component_v_divider),
        _createVNode(_component_v_card_actions, { class: "px-2 py-1" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_btn, {
              color: "info",
              onClick: _cache[19] || (_cache[19] = $event => (emit('switch'))),
              "prepend-icon": "mdi-view-dashboard",
              disabled: saving.value,
              variant: "text",
              size: "small"
            }, {
              default: _withCtx(() => [...(_cache[37] || (_cache[37] = [
                _createTextVNode("状态页", -1)
              ]))]),
              _: 1
            }, 8, ["disabled"]),
            _createVNode(_component_v_spacer),
            _createVNode(_component_v_btn, {
              color: "secondary",
              variant: "text",
              onClick: resetConfigToFetched,
              disabled: !initialConfigLoaded.value || saving.value,
              "prepend-icon": "mdi-restore",
              size: "small"
            }, {
              default: _withCtx(() => [...(_cache[38] || (_cache[38] = [
                _createTextVNode("重置", -1)
              ]))]),
              _: 1
            }, 8, ["disabled"]),
            _createVNode(_component_v_btn, {
              color: "primary",
              disabled: !isFormValid.value || saving.value,
              onClick: saveFullConfig,
              loading: saving.value,
              "prepend-icon": "mdi-content-save",
              variant: "text",
              size: "small"
            }, {
              default: _withCtx(() => [...(_cache[39] || (_cache[39] = [
                _createTextVNode("保存配置", -1)
              ]))]),
              _: 1
            }, 8, ["disabled", "loading"]),
            _createVNode(_component_v_btn, {
              color: "grey",
              onClick: _cache[20] || (_cache[20] = $event => (emit('close'))),
              "prepend-icon": "mdi-close",
              disabled: saving.value,
              variant: "text",
              size: "small"
            }, {
              default: _withCtx(() => [...(_cache[40] || (_cache[40] = [
                _createTextVNode("关闭", -1)
              ]))]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]))
}
}

};
const Config = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-f5b68771"]]);

export { Config as default };
