<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-8">
            <div class="d-flex align-items-start">
              <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist"
                   aria-orientation="vertical">
                <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Friends
                </button>
                <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Friend Requests
                </button>
                <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-messages"
                        type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Sent Requests
                </button>
                <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings"
                        type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Blocked
                </button>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                     aria-labelledby="v-pills-home-tab">
                  <accepted/>
                </div>
                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel"
                     aria-labelledby="v-pills-profile-tab">
                  <request/>
                </div>
                <div class="tab-pane fade" id="v-pills-messages" role="tabpanel"
                     aria-labelledby="v-pills-messages-tab">
                  <sent/>
                </div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel"
                     aria-labelledby="v-pills-settings-tab">
                  <blocked/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accepted from "./accepted/Accepted";
import Request from "./request/Request";
import Sent from "./sent/Sent";
import Blocked from "./blocked/Blocked";

export default {
  name: "Friends",
  data() {
    return {}
  },
  components: {
    Accepted,
    Request,
    Sent,
    Blocked
  },
}
</script>

<style scoped>
.nav-link {
  text-align: left;
}
</style>
