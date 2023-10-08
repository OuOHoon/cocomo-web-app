<script>
import axios from "axios";
import {battleAbilityOptionValue, categoryOptionValue, skillDataList} from "@/common";

const alarmListUrl = import.meta.env.VITE_ALARM_LIST_URL;
const getAlarms = async () => {
  try {
    const response = await axios.get(alarmListUrl);
    if (response.status === 200) {
      console.log('get alarm 성공');
      return response.data;
    } else {
      console.log('get alarm 실패')
    }
  } catch (e) {
    console.error('get alarms ' + e)
  }
}

const skillCodeMap = skillDataList.reduce((acc, curr) => {
  acc[curr.Value] = curr.Text
  return acc
}, {null: '상관없음'})

const categoryCodeMap = {}
for (const [key, value] of Object.entries(categoryOptionValue)) {
  categoryCodeMap[value] = key;
}
const battleAbilityCodeMap = {}
for (const [key, value] of Object.entries(battleAbilityOptionValue)) {
  battleAbilityCodeMap[value] = key;
}

function convertToTableData(alarms) {
  const result = [];
  alarms.forEach((alarm) => {
    result.push({
      category: categoryCodeMap[alarm.categoryCode],
      ability1: battleAbilityCodeMap[alarm.statCode1],
      ability2: battleAbilityCodeMap[alarm.statCode2],
      skill1: skillCodeMap[alarm.abilityCode1],
      skill2: skillCodeMap[alarm.abilityCode2],
      skill1value: alarm.abilityMinValue1,
      skill2value: alarm.abilityMinValue2,
      tradeCount: alarm.tradeCount,
      quality: alarm.quality,
      buyPrice: alarm.price,
      penalty: skillCodeMap[alarm.penaltyCode],
      penaltyValue: alarm.penaltyMaxValue
    })
  })
  return result
}

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: '장신구 종류',
        align: 'start',
        sortable: false,
        key: 'category'
      },
      {
        title: '특성1',
        align: 'start',
        sortable: false,
        key: 'ability1'
      },
      {
        title: '특성2',
        align: 'start',
        sortable: false,
        key: 'ability2'
      },
      {
        title: '각인1',
        align: 'start',
        sortable: false,
        key: 'skill1'
      },
      {
        title: '최소치',
        align: 'start',
        sortable: false,
        key: 'skill1value'
      },
      {
        title: '각인2',
        align: 'start',
        sortable: false,
        key: 'skill2'
      },
      {
        title: '최소치',
        align: 'start',
        sortable: false,
        key: 'skill2value'
      },
      {
        title: '패널티',
        align: 'start',
        sortable: false,
        key: 'penalty'
      },
      {
        title: '최대',
        align: 'start',
        sortable: false,
        key: 'penaltyValue'
      },
      {
        title: '구매 가격',
        align: 'start',
        sortable: false,
        key: 'buyPrice'
      },
      {
        title: '품질 최소',
        align: 'start',
        sortable: false,
        key: 'quality'
      },
      {
        title: '거래 가능',
        align: 'start',
        sortable: false,
        key: 'tradeCount'
      },
      {
        title: '삭제',
        align: 'start',
        sortable: false,
        key: 'actions'
      },
    ],
    alarms: [],
    editedIndex: -1,
    editedItem: {
      category: '',
      ability1: '',
      ability2: '',
      skill1: '',
      skill2: '',
      skill1value: 0,
      skill2value: 0,
      tradeCount: 0,
      quality: 0,
      buyPrice: 0,
      penalty: '',
      penaltyValue: 0
    },
    defaultItem: {
      category: '',
      ability1: '',
      ability2: '',
      skill1: '',
      skill2: '',
      skill1value: 0,
      skill2value: 0,
      tradeCount: 0,
      quality: 0,
      buyPrice: 0,
      penalty: '',
      penaltyValue: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '새 알람 등록' : '알람 수정'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.alarms = convertToTableData(await getAlarms())
    },

    editItem(item) {
      this.editedIndex = this.alarms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item.index

      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.alarms.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.alarms[this.editedIndex], this.editedItem)
      } else {
        this.alarms.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<script setup>


</script>

<template>
  <v-container style="width: 1200px;"> <!-- 고정 너비 설정 -->
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="alarms"
        class="elevation-1 text-left"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>알람 등록 현황</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
<!--          <v-dialog-->
<!--              v-model="dialog"-->
<!--              max-width="500px"-->
<!--          >-->
<!--            <template v-slot:activator="{ props }">-->
<!--              <v-btn-->
<!--                  color="primary"-->
<!--                  dark-->
<!--                  class="mb-2"-->
<!--                  v-bind="props"-->
<!--              >-->
<!--                새 알람 등록-->
<!--              </v-btn>-->
<!--            </template>-->
<!--            <v-card>-->
<!--              <v-card-title>-->
<!--                <span class="text-h5">{{ formTitle }}</span>-->
<!--              </v-card-title>-->

<!--              <v-card-text>-->
<!--                <v-container>-->
<!--                  <v-row>-->
<!--                    <v-col-->
<!--                        cols="12"-->
<!--                        sm="6"-->
<!--                        md="4"-->
<!--                    >-->
<!--                      <v-text-field-->
<!--                          v-model="editedItem.name"-->
<!--                          label="Dessert name"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col-->
<!--                        cols="12"-->
<!--                        sm="6"-->
<!--                        md="4"-->
<!--                    >-->
<!--                      <v-text-field-->
<!--                          v-model="editedItem.calories"-->
<!--                          label="Calories"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col-->
<!--                        cols="12"-->
<!--                        sm="6"-->
<!--                        md="4"-->
<!--                    >-->
<!--                      <v-text-field-->
<!--                          v-model="editedItem.fat"-->
<!--                          label="Fat (g)"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col-->
<!--                        cols="12"-->
<!--                        sm="6"-->
<!--                        md="4"-->
<!--                    >-->
<!--                      <v-text-field-->
<!--                          v-model="editedItem.carbs"-->
<!--                          label="Carbs (g)"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col-->
<!--                        cols="12"-->
<!--                        sm="6"-->
<!--                        md="4"-->
<!--                    >-->
<!--                      <v-text-field-->
<!--                          v-model="editedItem.protein"-->
<!--                          label="Protein (g)"-->
<!--                      ></v-text-field>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                </v-container>-->
<!--              </v-card-text>-->

<!--              <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn-->
<!--                    color="blue-darken-1"-->
<!--                    variant="text"-->
<!--                    @click="close"-->
<!--                >-->
<!--                  취소-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                    color="blue-darken-1"-->
<!--                    variant="text"-->
<!--                    @click="save"-->
<!--                >-->
<!--                  확인-->
<!--                </v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-dialog>-->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">알람을 삭제하시겠습니까?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">취소</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">확인</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
<!--        <v-icon-->
<!--            size="small"-->
<!--            class="me-2"-->
<!--            @click="editItem(item)"-->
<!--        >-->
<!--          mdi-pencil-->
<!--        </v-icon>-->
        <v-icon
            size="small"
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
<!--      <template v-slot:no-data>-->
<!--        <v-btn-->
<!--            color="primary"-->
<!--            @click="initialize"-->
<!--        >-->
<!--          Reset-->
<!--        </v-btn>-->
<!--      </template>-->
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>