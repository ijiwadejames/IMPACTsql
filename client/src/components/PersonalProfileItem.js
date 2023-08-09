
const PersonalProfileItem = ({profile}) => {
    return (
        <div className="mt-3 ms-2 col-12" style={{fontSize: "9pt"}}>
               
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Username</div>
                        <div className="col-8"> @{profile.username}</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Name</div>
                        <div className="col-8">
                          {" "}
                          {profile.lastname} {profile.firstname}{" "}
                          {profile.othernames}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Date of Birth</div>
                        <div className="col-8">
                          {profile.dob === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{profile.dd} {profile.mm} {profile.yyyy.slice(0, 2) + "**"}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Gender</div>
                        <div className="col-8">
                          {profile.gender === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{profile.gender}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Country</div>
                        <div className="col-8">
                          {profile.countries === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{profile.countries}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Phone</div>
                        <div className="col-8">
                          {profile.phones === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{profile.phones}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Email</div>
                        <div className="col-8">
                          {profile.email === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{profile.email}</>
                          )}
                        </div>
                      </div>             
              </div>
    );
};

export default PersonalProfileItem;