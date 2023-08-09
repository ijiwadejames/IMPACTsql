import React from 'react'
import AdNav from './AdNav'

const Messages = () => {
  return (
    <div className="container-fluid">
            <div className="row">
                    <div className="col-xs-10 col-xs-10 col-md-10 col-lg-10 m-auto mt-4">
                        <h1>Received Messages</h1>
                            
                        <AdNav />

                        <div className="col-12 mt-2">
                            Messages Here!
                        </div>
                    </div>                    
            </div>
        </div>
  )
}

export default Messages
