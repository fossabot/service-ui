import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Parser from 'html-react-parser';
import CrossIcon from 'common/img/icon-cross-inline.svg';
import { withTooltip } from 'components/main/tooltips/tooltip';
import styles from './selectedLaunch.scss';

const cx = classNames.bind(styles);

const TooltipComponent = ({ error }) => <div>{error}</div>;
TooltipComponent.propTypes = {
  error: PropTypes.string,
};
TooltipComponent.defaultProps = {
  error: '',
};

const SelectedLaunchBody = ({ name, number, error, onUnselect }) => (
  <div className={cx('selected-launch', { error: !!error })}>
    <span className={cx('name')}>{`${name} #${number}`}</span>
    <div className={cx('cross-icon')} onClick={onUnselect}>
      {Parser(CrossIcon)}
    </div>
  </div>
);
SelectedLaunchBody.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onUnselect: PropTypes.func,
  error: PropTypes.string,
  number: PropTypes.number.isRequired,
};
SelectedLaunchBody.defaultProps = {
  className: '',
  onUnselect: () => {},
  error: null,
};

const SelectedLaunchWithTooltip = withTooltip({
  TooltipComponent,
  data: {
    width: 200,
    leftOffset: 10,
    noArrow: true,
  },
})(SelectedLaunchBody);

export const SelectedLaunch = ({ error, ...rest }) =>
  error ? <SelectedLaunchWithTooltip error={error} {...rest} /> : <SelectedLaunchBody {...rest} />;

SelectedLaunch.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onUnselect: PropTypes.func,
  error: PropTypes.string,
  number: PropTypes.number.isRequired,
};
SelectedLaunch.defaultProps = {
  className: '',
  onUnselect: () => {},
  error: null,
};
