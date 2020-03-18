<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h1>Profile</h1>
            </div>
            <div>
              <button
                @click="$router.go(-1)"
                class="btn btn-outline-secondary btn-sm d-inline-block mr-1">
                <i class="fas fa-arrow-left"></i> Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle" src alt="User profile picture" />
                </div>
                <h3 class="profile-username text-center">{{loggedInAdminUser.name}}</h3>
                <p class="text-muted text-center">Software Engineer</p>
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Mobile:</b>
                    <a class="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Email:</b>
                    <a class="float-right">{{loggedInAdminUser.email}}</a>
                  </li>
                </ul>
                <a href="#" class="btn btn-primary btn-block">
                  <b>Follow</b>
                </a>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card" style="width:50%">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link active" href="#home" data-toggle="tab">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#edit" data-toggle="tab">Edit</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="home">
                    <!-- Post -->
                    <div class="post">
                      <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                          <b>Name:</b> {{loggedInAdminUser.name}}
                        </li>
                        <li class="list-group-item">
                          <b>Email:</b> {{loggedInAdminUser.email}}
                        </li>
                      </ul>
                    </div>
                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="edit">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input v-model="form.name" name="name" type="text" class="form-control" id="inputName" placeholder="Name"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input v-model="form.email" name="email" type="email" class="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputMobile" class="col-sm-2 col-form-label">Mobile</label>
                        <div class="col-sm-10">
                          <input type="phone" class="form-control" id="inputMobile" placeholder="Mobile"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" class="btn btn-danger">
                            <i class="fas fa-sync-alt"></i> Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.card -->
</template>
<script>
export default {
    data(){
        return{
            loggedInAdminUser:[],
            form: new Form({
                name:'',
                email:''
            })
        }
    },
    methods:{
        getLoggedInAdminUser(){
            //axios.defaults.baseURL = 'http://localhost/laraapiskel/public/';
            axios.get('/user')
            .then(response =>{
                this.loggedInAdminUser = response.data;
                this.form.fill(response.data);
                console.log(response.data);
            })
            .catch(error =>{
                console.log(error)
            });

        }
    },
    mounted(){
        this.getLoggedInAdminUser();
    }

}
</script>