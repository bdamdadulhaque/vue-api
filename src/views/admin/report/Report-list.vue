<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Report List</h3>
                  <div>
                    <button @click="$router.go(-1)" class="btn btn-xs btn-default d-inline-block mr-1">
                      <i class="fas fa-arrow-left"></i> Back
                    </button>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped text-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Book</th>
                      <th>Ch. No.</th>
                      <th>Ha. No.</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(report, index) in reports" :key="index">
                      <td>{{report.reporter_name}}</td>
                      <td>{{report.report_email}}</td>
                      <td>
                        <span v-if="report.report_type == 1">Mismatch Translation</span>
                        <span v-if="report.report_type == 2">Spelling Mistake</span>
                        <span v-if="report.report_type == 3">Other</span>
                      </td>
                      <td>{{report.report_details}}</td>
                      <td>{{report.book_name}}</td>
                      <td>{{report.chapter_no}}</td>
                      <td>{{report.hadith_no}}</td>
                      <td>
                        <span v-if="report.report_status == 1" class="badge bg-success">Fixed</span>
                        <span v-if="report.report_status == 0" class="badge bg-warning">Not Fixed</span>
                      </td>
                      <td v-if="userRole == 1">
                        <div class="btn-group">
                          <router-link :to="{name:'report-edit', params:{report_id:report.id}}" class="btn btn-sm btn-outline-warning">Edit</router-link>
                          <button @click.prevent="reportDelete(report.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                        </div>
                      </td>
                      <td v-else>
                        <span>Not Allowed</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Book</th>
                      <th>Ch. No.</th>
                      <th>Ha. No.</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      reports: [],
      moment,
      userRole:localStorage.getItem('userRole')
    };
  },
  methods: {
    reportList() {
      axios
        .get("/report")
        .then(response => {
          console.log(response.data.fetched_report)
          this.reports = response.data.fetched_report;
          // data table
          $(function() {
            if ($.fn.dataTable.isDataTable("#example1")) {
              var table = $("#example1").DataTable();
            } else {
              table = $("#example1").DataTable({
                paging: true
               // order: [[0, "desc"]]
              });
            }
          }); // data table
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, record not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    reportDelete(report_id) {
    let localThis = this;
      iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: 'Are you sure to delete that?',
      position: 'center',
      buttons: [
        ['<button><b>YES</b></button>', function (instance, toast) {
          axios.delete("/report/" + report_id)
              .then(response => {
                  localThis.reportList();
                  iziToast.warning({
                  title: "Caution",
                  message: "Successfully deleted record!",
                  position: "topRight",
                  timeout: 2000
                  });
                })
              .catch(error => {
                iziToast.warning({
                  title: "Warning",
                  message: "Something wrong, record not deleted!",
                  position: "topRight",
                  timeout: 2000
                });
              });
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
          ['<button>NO</button>', function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }],
        ],
        onClosing: function(instance, toast, closedBy){
          //console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
          //console.info('Closed | closedBy: ' + closedBy);
        }
      });
    }
  },
  mounted() {
    this.reportList();
  }
};
</script>