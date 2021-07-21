import React from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince, convertToBiobit } from '../../utils';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import Dialog from '../../components/Dialog';

const Desktop = ({ account, showDialog, isSubmitting, dialogMessage, request, sendSignalRef, submitSignal, error, setError }) => {

  return (
    <div>
      <ConnectDialog isOpen={!account && showDialog} />
      <Dialog
        isOpen={isSubmitting}
        content={(
          dialogMessage
        )}
        hasSpinner
        type='success'
      />
      <RequestDetails
        request={request}
        ref={sendSignalRef}
        submitSignal={submitSignal}
        timestamp={timeSince(request.timestamp)}
        error={error}
        setError={setError}
      />
    </div>
  );
}


export default Desktop;