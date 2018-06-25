import http from '../common/http';

// 获取列表

export function getBaseList({
  type,
  name,
  parentId
}) {
  return http.get('Base', {
    type,
    name,
    parentId
  })
}

// 注册
export function register({
  DiseaseId,
  FullName,
  Sex,
  Birthday,
  Mobile,
  Code,
  Address
}) {
  return http.post('Custom', {
    DiseaseId,
    FullName,
    Sex,
    Birthday,
    Mobile,
    Code,
    Address
  })
}
// 发送手机号
export const MobileVerifyCode = (parmas) => {
  return http.post('MobileVerifyCode', parmas)
}

// GET api/Custom
export const getCustom = () => {
  return http.get('Custom')
}

// PUT api/Custom
export const putCustom = (parmas) => {
  return http.put('Custom', parmas)
}


// 出血计算。
export function compute({
  AgeOption,
  LocationHeadFace,
  LocationOther,
  Symptom,
  GutSymptom,
  CentralSystemBlood,
  SymptomLessBlood
}) {
  return http.post('CustomBleed', {
    AgeOption,
    LocationHeadFace,
    LocationOther,
    Symptom,
    GutSymptom,
    CentralSystemBlood,
    SymptomLessBlood
  })
}

// 出血量历史
export function getCustomBleedHistory({
  pageSize = 10,
  pageIndex,
  SortDire
}) {
  return http.get('CustomBleed', {
    pageSize,
    pageIndex,
    SortDire
  })
}
// 删除
export function delCustomBleedHistory(id) {
  return http.delete(`CustomBleed/${id}`)
}


// 用户用药。
export function medicine({
  VisitTime,
  IsCut,
  IsUseMedicine,
  MedicineIds,
  OtherMedicine,
  BloodCellsCount
}) {
  return http.post('CustomMedicine', {
    VisitTime,
    IsCut,
    IsUseMedicine,
    MedicineIds,
    OtherMedicine,
    BloodCellsCount
  })
}
// 用户用药历史。
export function getMedicineHistory({
  pageSize = 10,
  pageIndex

}) {
  return http.get('CustomMedicine', {
    pageSize,
    pageIndex
  })
}
// 删除
export function delMedicineHistory(id) {
  return http.delete(`CustomMedicine/${id}`)
}
// 就诊。
export function toHospital({
  VisitTime,
  HospitalId,
  VisitType
}) {
  return http.post('CustomVisit', {
    VisitTime,
    HospitalId,
    VisitType
  })
}

// 就诊历史。
export function getCustomVisitHistory({
  pageSize = 10,
  pageIndex

}) {
  return http.get('CustomVisit', {
    pageSize,
    pageIndex
  })
}
// 删除
export function delCustomVisitHistory(id) {
  return http.delete(`CustomVisit/${id}`)
}

// 出血历史记录
export const getHistory = (parmas) => {
  return http.get('history', parmas)
}

// 医院列表
export const getHospitalList = (parmas) => {
  return http.get('Hospital', parmas)
}
