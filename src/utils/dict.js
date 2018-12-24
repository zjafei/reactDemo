const dict = {};
// 成功
dict.SUCCESS = 0;

// 没有权限
dict.PERMISSION_INVALID = 200;

// 未登录
dict.LOGIN_REQUIRED = 210;

// 数据不正确
dict.DATA_INVALID = 300;

// 不被识别的数据类型
dict.DATA_UNRECOGNIZED = 310;

// 数据格式不正确
dict.DATA_FORMAT_INVALID = 311;

// 表单数据不正确
dict.DATA_FORM_INVALID = 320;

// 电话号码已存在
dict.DATA_PHONE_EXIST = 331;

// 数据不存在
dict.DATA_NOT_EXIST = 340;

// 电话号码不存在
dict.DATA_PHONE_NOT_EXIST = 341;

// 参数错误
dict.DATA_FIELD_INVALID = 350;

// 验证码不正确
dict.DATA_VERIFY_CODE_INVALID = 351;

// 获取用户信息失败
dict.AUTH_FAILED = 400;

// 用户身份异常
dict.AUTH_IDENTITY_ABNORMAL = 410;

// 用户未激活
dict.AUTH_IDENTITY_NOT_ACTIVE = 411;

// 登录失败
dict.LOGIN_FAILED = 420;

// 客户端类型错误
dict.CLIENT_INVALID = 500;

// 操作失败
dict.OPERATE_FAILED = 600;

// 操作次数已达上限
dict.REACH_THE_MAX = 610;

// 资源无效
dict.RESOURCE_INVALID = 700;

// 资源不存在
dict.RESOURCE_NOT_EXIST = 710;

// 资源已存在
dict.RESOURCE_EXIST = 720;

// 资源未改变
dict.RESOURCE_NOT_MODIFIED = 730;

// 资源已改变
dict.RESOURCE_MODIFIED = 740;

dict.errorCode = {
  [dict.SUCCESS]: '成功',
  [dict.PERMISSION_INVALID]: '没有权限',
  [dict.LOGIN_REQUIRED]: '未登录',
  [dict.DATA_INVALID]: '数据不正确',
  [dict.DATA_UNRECOGNIZED]: '不被识别的数据类型',
  [dict.DATA_FORMAT_INVALID]: '数据格式不正确',
  [dict.DATA_FORM_INVALID]: '表单数据不正确',
  [dict.DATA_PHONE_EXIST]: '电话号码已存在',
  [dict.DATA_NOT_EXIST]: '数据不存在',
  [dict.DATA_PHONE_NOT_EXIST]: '电话号码不存在',
  [dict.DATA_FIELD_INVALID]: '参数错误',
  [dict.DATA_VERIFY_CODE_INVALID]: '验证码不正确',
  [dict.AUTH_FAILED]: '获取用户信息失败',
  [dict.AUTH_IDENTITY_ABNORMAL]: '用户身份异常',
  [dict.AUTH_IDENTITY_NOT_ACTIVE]: '用户未激活',
  [dict.LOGIN_FAILED]: '登录失败',
  [dict.CLIENT_INVALID]: '客户端类型错误',
  [dict.OPERATE_FAILED]: '操作失败',
  [dict.REACH_THE_MAX]: '操作次数已达上限',
  [dict.RESOURCE_INVALID]: '资源无效',
  [dict.RESOURCE_NOT_EXIST]: '资源不存在',
  [dict.RESOURCE_EXIST]: '资源已存在',
  [dict.RESOURCE_NOT_MODIFIED]: '资源未改变',
  [dict.RESOURCE_MODIFIED]: '资源已改变',
};

dict.OFFICER_GENERAL = 'GENERAL';
dict.OFFICER_HIGH = 'HIGH';

dict.officerType = {
  [dict.OFFICER_GENERAL]: '普通认证员',
  [dict.OFFICER_HIGH]: '高级认证员',
};

dict.ADMIN_GENERAL = 'GENERAL';
dict.ADMIN_FACTORY = 'FACTORY';

dict.adminType = {
  [dict.ADMIN_GENERAL]: '普通',
  [dict.ADMIN_FACTORY]: '工厂',
};

// VERIFIED,BINDED, COMPLETED
dict.MACHINE_VERIFIED = 'VERIFIED';
dict.MACHINE_BINDED = 'BINDED';
dict.MACHINE_COMPLETED = 'COMPLETED';

dict.machineCertState = {
  [dict.MACHINE_VERIFIED]: '已验证',
  [dict.MACHINE_BINDED]: '已绑定',
  [dict.MACHINE_COMPLETED]: '已完成',
};

dict.MACHINE_OWNER_TYPE_PERSONAL = 'PERSONAL';
dict.MACHINE_OWNER_TYPE_PARTNER = 'PARTNER';
dict.MACHINE_OWNER_TYPE_CORPORATE = 'CORPORATE';

dict.machineOwnerType = {
  [dict.MACHINE_OWNER_TYPE_PERSONAL]: '个人机主',
  [dict.MACHINE_OWNER_TYPE_PARTNER]: '合伙购买',
  [dict.MACHINE_OWNER_TYPE_CORPORATE]: '公司所有',
};

dict.machineOwnerTypeLabel = {
  [dict.MACHINE_OWNER_TYPE_PERSONAL]: {
    tabName: '机主信息',
    ownerName: '机主姓名',
    ownerIdCardNumber: '身份证号',
    ownerIdCardPhoto: '身份证照片',
    contacts: '联系人',
    contactsPhone: '机主电话',
    address: '机主地址',
  },
  [dict.MACHINE_OWNER_TYPE_PARTNER]: {
    tabName: '所属者信息',
    ownerName: '所属者名称',
    ownerIdCardNumber: '身份证号',
    ownerIdCardPhoto: '身份证照片',
    contacts: '联系人',
    contactsPhone: '联系电话',
    address: '所属者地址',
  },
  [dict.MACHINE_OWNER_TYPE_CORPORATE]: {
    tabName: '公司信息',
    ownerName: '公司名',
    ownerIdCardNumber: '营业执照号',
    ownerIdCardPhoto: '营业执照照片',
    contacts: '联系人',
    contactsPhone: '联系电话',
    address: '公司地址',
  },
};

dict.LICENSE_PRODUCE_STATE_ALLOCATED = 'ALLOCATED';
dict.LICENSE_PRODUCE_STATE_CREATED = 'CREATED';
dict.LICENSE_PRODUCE_STATE_BINDED = 'BINDED';
dict.LICENSE_PRODUCE_STATE_VALID = 'VALID';

dict.licenseProduceState = {
  [dict.LICENSE_PRODUCE_STATE_ALLOCATED]: '已分配',
  [dict.LICENSE_PRODUCE_STATE_CREATED]: '已创建',
  [dict.LICENSE_PRODUCE_STATE_BINDED]: '已绑定RFID',
  [dict.LICENSE_PRODUCE_STATE_VALID]: '合格',
};

export default dict;
