import PropTypes from 'prop-types';
import evaluateNode from '../utils/evaluateNode';
import formatTime from '../utils/formatTime';
import { useRetrieveTime } from '../hooks/useRetrieveTime';
import calculateTime from '../utils/calculateTime';

function RadiatorNode(props) {
  // TODO: Include global state using Context to not prop drill
  // const { retrieved_at } = useBuildingData();
  const { retrieved_at } = useRetrieveTime();
  const nodeStatus = evaluateNode(props, retrieved_at);
  const { last_message, lora_euid, radiator_temperature, room_temperature } = props;

  if (nodeStatus === 'INVALID_NODE') {
    return (
      <div className={`node ${nodeStatus}`} data-testid='radiator-node'>
        <p>INVALID NODE</p>
      </div>
    );
  }

  return (
    <div className={`node ${nodeStatus}`} data-testid='radiator-node'>
      <h5>{lora_euid}</h5>
      <p>{radiator_temperature}</p>
      <p>{room_temperature}</p>
      <p>{last_message}</p>
      <p>{formatTime(last_message)}</p>
      <p>{calculateTime(retrieved_at, last_message)}</p>
    </div>
  );
}

RadiatorNode.propTypes = {
  last_message: PropTypes.number,
  lora_euid: PropTypes.string,
  radiator_temperature: PropTypes.number,
  room_temperature: PropTypes.number,
};

export default RadiatorNode;
