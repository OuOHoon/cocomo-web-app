<script setup>
import {reactive, ref, toRaw} from 'vue'
import Cookies from "js-cookie";
import axios from "axios";
import {skillDataList, battleAbilityOptionValue, categoryOptionValue} from "@/common";

const categoryOptions = ['전체', '목걸이', '귀걸이', '반지']

const battleAbilityOptions = ['상관없음', '치명', '특화', '신속', '제압', '인내', '숙련']
const qualityOptions = [100, 90, 80, 70, 60, 50, 0]



const skillNames = skillDataList.map((data) => {
  return data['Text']
})
const skillValues = skillDataList.reduce((acc, curr) => {
  acc[curr['Text']] = curr['Value'];
  return acc;
}, {'상관없음': null});

const penaltyOptions = ['공격력 감소', '공격속도 감소', '방어력 감소', '이동속도 감소', '상관없음']


const selectedOptions = reactive({
  category: '전체',
  battleAbility1: '상관없음',
  battleAbility2: '상관없음',
  skill1: '상관없음',
  skill1MinValue: 3,
  skill2: '상관없음',
  skill2MinValue: 3,
  penalty: '상관없음',
  penaltyMaxValue: 3,
  quality: 0,
  buyPrice: 0,
  tradeCount: 0
})

const submitAlarm = async (event) => {
  try {
    const data = {};
    data['categoryCode'] = categoryOptionValue[selectedOptions.category];
    data['statCode1'] = battleAbilityOptionValue[selectedOptions.battleAbility1];
    data['statCode2'] = battleAbilityOptionValue[selectedOptions.battleAbility2];
    data['abilityCode1'] = skillValues[selectedOptions.skill1];
    data['abilityMinValue1'] = selectedOptions.skill1MinValue;
    data['abilityCode2'] = skillValues[selectedOptions.skill2];
    data['abilityMinValue2'] = selectedOptions.skill2MinValue;
    data['penaltyCode'] = skillValues[selectedOptions.penalty];
    data['penaltyMinValue'] = selectedOptions.penaltyMaxValue;
    data['quality'] = selectedOptions.quality;
    data['tradeCount'] = selectedOptions.tradeCount;
    data['price'] = selectedOptions.buyPrice;

    console.log('submit alarm data=' + JSON.stringify(data));
    const res = await axios.post('https://localhost:8443/alarm', data,
        {
          headers: {
            'Content-Type': "application/json",
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
          }
        }
    );
    if (res.status === 200) {
      console.log('submit alarm 성공');
    } else {
      console.log('submit alarm 실패')
    }
  } catch (e) {
    console.error('submit alarm 에러' + e)
  }
};
</script>

<template>
  <h1 class="text-h1, title" style="justify-content: center; text-align: center">알람 등록</h1>

  <v-container class="rounded-xl form-select">
    <v-form class="mt-5">
      <v-row class="mb-n10">
        <v-col class="d-flex justify-center">
          <v-select :items="categoryOptions" v-model="selectedOptions.category"
                    label="장신구 종류" class="mr-4">
          </v-select>
          <v-select :items="battleAbilityOptions" v-model="selectedOptions.battleAbility1"
                    label="전투 특성1" class="mr-4">
          </v-select>

          <v-select :items="battleAbilityOptions" v-model="selectedOptions.battleAbility2"
                    v-if="selectedOptions.category === '목걸이'"
                    class="mr-4"
                    label="전투 특성2">
          </v-select>
        </v-col>
      </v-row>
      <v-row class="mb-n10">
        <v-col class="d-flex justify-center">
          <v-autocomplete :items="skillNames" class="mr-3"
                          label="각인1" v-model="selectedOptions.skill1"
          >
          </v-autocomplete>
          <v-text-field class="mr-3"
                        label="각인1 최소치" v-model="selectedOptions.skill1MinValue"
          >
          </v-text-field>
          <v-autocomplete :items="skillNames" class="mr-3"
                          label="각인2" v-model="selectedOptions.skill2">
          </v-autocomplete>
          <v-text-field class="mr-3"
                        label="각인2 최소치" v-model="selectedOptions.skill2MinValue">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n10">
        <v-col class="d-flex justify-center">
          <v-autocomplete :items="penaltyOptions" class="mr-3"
                          label="패널티" v-model="selectedOptions.penalty">
          </v-autocomplete>
          <v-text-field class="mr-3"
                          label="패널티 최대치" v-model="selectedOptions.penaltyMaxValue">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n10">
        <v-col class="d-flex justify-center">
          <v-text-field class="mr-3"
                          label="최대 구매 가격" v-model="selectedOptions.buyPrice">
          </v-text-field>
          <v-text-field class="mr-3"
                          label="거래 가능 최소치" v-model="selectedOptions.tradeCount">
          </v-text-field>
          <v-select label="품질(최소치)" class="mr-3"
                    :items="qualityOptions"
                    v-model="selectedOptions.quality">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn type="button" clas style="width: 300px;"
                 @click="submitAlarm">
            등록
          </v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-container>


</template>

<style scoped>
.title {
  text-align: left;
}
.form-select {
  background-color: white;
  width: 600px;
}


</style>