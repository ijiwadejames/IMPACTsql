import he from 'he';

const ProfessionalProfileItem = (props) => {
    const decodeAbout = he.decode(props.about);

    return (
        <div className="mt-3 ms-2 col-12" style={{fontSize: "9pt"}}>                
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Category</div>
                        <div className="col-8">
                          {props.category === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{props.category}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">Experience</div>
                        <div className="col-8">
                          {props.experience === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{props.experience}</>
                          )}
                        </div>
                      </div>
                      <div className="row col-12">
                        <div className="col-3 fw-semibold">About</div>
                        <div className="col-8">
                          {props.about === "" ? (
                            <>unavailable</>
                          ) : (
                            <>{decodeAbout}</>
                          )}
                        </div>
                      </div>                  
              </div>
    );
};

export default ProfessionalProfileItem;