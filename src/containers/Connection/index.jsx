import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Connection() {
  return (
    <div className='main-content'>
      <div className='content-heading'>
        <div class="connection-top-block">
          <div className='connection-left-sec'>
            <div className="search-sec"><input type="search" id="gsearch" name="gsearch" placeholder="Search.."></input></div>
            <div className="new-onnection-button"><button> + New Connection </button></div>
            <div className="index-button"><button> Index All Connections </button></div>
          </div>
          <div className='connection-right-sec'>
            <div className="selected-sec">Selected 1 of 18 Connections</div>
            <div className="creation-button">
              <button>
                <img src='/images/down-filter-icon.svg'></img>
                <span>Creation date</span>
                <img src='/images/down-arrow-icon.svg'></img>
              </button >
            </div>
            <div className="visua-button"><button> Model Visualization </button></div>
            <div className="flow-button"><button> Create New Flow </button></div>
            <div className="dataset-button"><button> Import Dataset </button></div>
          </div>
        </div>
      </div>

      <div className='connection-body-block'>
        <div className='row'>
          <div class="col-sm-9">
            <div className='connection-bodyleft-section'>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/snowflake-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/azure-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/azure-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/elephant-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/snowflake-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/twitter-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/elephant-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/direct-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/direct-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
              <div className='connection-list-sec'>
                <div className='project-sec checkbox'><input type="checkbox" ></input></div>
                <div className='project-sec'>
                  <div className='project-img'><img src='/images/twitter-icon.svg'></img></div>
                  <div className='project-name'><p>snowflake-test</p> <span>snowflake</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div className='connection-rightbar-section'>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <img src='/images/direct-icon.svg'></img> s3_direct
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div className='creation-sec'>
                        <ul>
                          <li><p>Creation</p></li>
                          <li><span>1 year ago by</span> <img src='/images/direct-icon.svg'></img> </li>
                        </ul>
                      </div>
                      <div className='admin-detail-sec'>
                        <ul>
                          <li><span>URL:</span> https:\\dummyurl.com</li>
                          <li><span>Username:</span> admin</li>
                        </ul>
                      </div>
                      <div className='group-access-sec'>
                        <div class="accordion" id="accordionAccess">
                          <div class="accordion-item">
                            <h2 class="accordion-header">
                              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAccess" aria-expanded="true" aria-controls="collapseAccess">
                                Group Access
                              </button>
                            </h2>
                            <div id="collapseAccess" class="accordion-collapse collapse show" data-bs-parent="#accordionAccess">
                              <div class="accordion-body">
                                <ul>
                                  <li><span>Free usable by</span> <p>Everyone</p></li>
                                  <li><span>Details readable by</span> <p>Everyone</p></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      New Connection
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div className='select-source-sec'>
                        <p>Select Data Source</p>
                        <ul>
                          <li><img src='/images/azure-icon.svg'></img> Azure</li>
                          <li><img src='/images/elephant-icon.svg'></img> Hadoop</li>
                          <li><img src='/images/snowflake-icon.svg'></img> Snowflake</li>
                          <li><img src='/images/twitter-icon.svg'></img> Twitter</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Accordion Item #3
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div className='new-connection-block'>
                        <div className='new-conn-head'> <img src='/images/azure-icon.svg'></img> Azure </div>
                        <form action="/action_page.php">
                          <div className='row'>
                            <div className='col-sm-12'>
                              <label for="fname">Connection Name</label>
                              <input type="text" id="fname" name="firstname" placeholder="Azure_test"></input>
                            </div>
                            <div className='col-sm-12'>
                              <label for="lname">Host URL</label>
                              <input type="text" id="lname" name="lastname" placeholder="https:\\dummyurl.com"></input>
                            </div>
                            <div className='col-sm-12'>
                              <label for="lname">Database User ID</label>
                              <input type="text" id="lname" name="lastname" placeholder="TestDB1User"></input>
                            </div>
                            <div className='col-sm-12'>
                              <label for="lname">Database Password</label>
                              <input type="password" id="lname" name="lastname" placeholder="******************"></input>
                            </div>
                            <div className='col-sm-6'>
                              <button type="submit" value="Submit"> Connect </button>
                            </div>
                            <div className='col-sm-6'>
                              <button type="cancel" value="Cancel"> Cancel </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
