<template>
    <div class="container">
    <div class="row">
      <!-- Begin left sidebar -->
      <Sidebar/>
      <!-- End left sidebar -->
      <!-- Begin book heading and chapter -->
      <div class="col-md-9">
        <div class="hadith-name-headline d-flex mb-3">
          <i class="fa fa-book fa-2x"></i>
          <h4>সার্চের ফলাফল</h4>
          <!-- <p>( {{seearchRow.length}} টি  হাদিস )</p> -->
        </div>
        <!-- <div class="box-two mb-3 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="chapter-no">
               988
              </div>
              <div class="chapter-name">
                <a> chaoter name </a>
              </div>
              <div class="hadis-from-to">
                ১০৩২ - ১১৫৩
              </div>
            </div>
          </div>
        </div> -->

      
        <!-- <div v-for="(hadith, index) in this.$route.query.search_result" :key="index" class="single-hadith-box mb-3"> -->
        <div v-if="seearchRow != null" class="single-hadith-box mb-3">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="box-three d-flex">
                        <i class="fa fa-book-open fa-2x"></i>
                        <!-- <h6>/{{index+1}} অধ্যায়ঃ</h6> -->
                        <h6>/ অধ্যায়ঃ</h6>
                    </div>
                    <p class="chapter-subject">{{seearchRow.hadith_subject}}</p>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="box-four">
                        <div class="single-hadith d-flex">
                            <i class="far fa-sun"></i>
                            <h6>{{seearchRow.hadith_no}}</h6>
                        </div>
                        <p class="hadith-in-arabic">{{seearchRow.hadith_name_ar}}</p>
                        <p class="hadith-narrated">{{seearchRow.narrated_by}}</p>
                        <p class="hadith-in-bengali">{{seearchRow.hadith_name_bn}}</p>
                        <div class="hadith-footer">
                            <div class="hadith-value-text">
                                <p>হাদিসের মানঃ</p>
                            </div>
                            <div v-if="seearchRow.hadith_value == 1" class="hadith-value-sahi">
                                সহীহ হাদিস
                            </div>
                            <div v-if="seearchRow.hadith_value == 2" class="hadith-value-other">
                                অন্যান্য
                            </div>
                            <div class="direct-hadith-link">
                                <router-link :to="{name:'single-hadith', params:{hadith_id:seearchRow.id}}"><i class="fa fa-external-link-alt"></i> সরাসরি</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
          <p>No hadith found!</p>
        </div>

      </div><!-- End book heading and chpater -->
    </div>
    
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  components:{
    Sidebar
    },
  data(){
    return {
      form: new Form({
        book_id:this.$route.params.book_id,
        hadith_no:this.$route.params.hadith_no,
      }),
      seearchRow:[]
    }
  },
  methods: {
    searchByHadithNo(){
      this.form.post('/homepage-search-by-hadith-no')
        .then(response =>{
          this.seearchRow = response.data.fetched_hadith_no;
          console.log("hadis no fetched:"+response.data.fetched_hadith_no.hadith_subject);
        })
    }
  },
  mounted(){
    this.searchByHadithNo();
  }
}
</script>