import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import track from 'react-tracking';
import classNames from 'classnames/bind';
import { canSeeDemoData } from 'common/utils/permissions';
import {
  GENERAL,
  INTEGRATIONS,
  NOTIFICATIONS,
  DEFECT,
  ANALYSIS,
  DEMO_DATA,
} from 'common/constants/settingsTabs';
import { settingsTabSelector } from 'controllers/pages';
import { activeProjectRoleSelector, userAccountRoleSelector } from 'controllers/user';
import { redirectAction } from 'common/utils/routingUtils';
import { SETTINGS_PAGE, SETTINGS_PAGE_EVENTS } from 'components/main/analytics/events';
import { BetaBadge } from 'pages/inside/common/betaBadge';
import { NavigationTabs } from 'components/main/navigationTabs';
import { GeneralTab } from './generalTab';
import { AutoAnalysisTab } from './autoAnalysisTab';
import { NotificationsTab } from './notificationsTab';
import { DemoDataTab } from './demoDataTab';
import { IntegrationsTab } from './integrationsTab';
import { DefectTypesTab } from './defectTypesTab';
import styles from './settingsPage.scss';

const cx = classNames.bind(styles);
const messages = defineMessages({
  general: {
    id: 'SettingsPage.general',
    defaultMessage: 'General',
  },
  notifications: {
    id: 'SettingsPage.notifications',
    defaultMessage: 'Notifications',
  },
  integrations: {
    id: 'SettingsPage.integrations',
    defaultMessage: 'Integrations',
  },
  defect: {
    id: 'SettingsPage.defect',
    defaultMessage: 'Defect types',
  },
  analysis: {
    id: 'SettingsPage.analysis',
    defaultMessage: 'Auto-Analysis',
  },
  demoData: {
    id: 'SettingsPage.demoData',
    defaultMessage: 'Demo data',
  },
});

@connect(
  (state) => ({
    activeTab: settingsTabSelector(state),
    accountRole: userAccountRoleSelector(state),
    userRole: activeProjectRoleSelector(state),
  }),
  {
    onChangeTab: redirectAction,
  },
)
@injectIntl
@track({ page: SETTINGS_PAGE })
export class SettingsPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    createTabLink: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    changeTab: PropTypes.func.isRequired,
    activeTab: PropTypes.string,
    accountRole: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
  };
  static defaultProps = {
    activeTab: GENERAL,
  };

  createTabsConfig = () => {
    const tabsConfig = {
      [GENERAL]: {
        name: this.props.intl.formatMessage(messages.general),
        link: this.props.createTabLink(GENERAL),
        component: <GeneralTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.GENERAL_TAB,
        mobileDisabled: true,
      },
      [INTEGRATIONS]: {
        name: (
          <span>
            {this.props.intl.formatMessage(messages.integrations)}
            <BetaBadge className={cx('beta')} />
          </span>
        ),
        link: this.props.createTabLink(INTEGRATIONS),
        component: <IntegrationsTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.INTEGRATIONS_TAB,
      },
      [NOTIFICATIONS]: {
        name: this.props.intl.formatMessage(messages.notifications),
        link: this.props.createTabLink(NOTIFICATIONS),
        component: <NotificationsTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.NOTIFICATIONS_TAB,
        mobileDisabled: true,
      },
      [DEFECT]: {
        name: this.props.intl.formatMessage(messages.defect),
        link: this.props.createTabLink(DEFECT),
        component: <DefectTypesTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.DEFECT_TYPE_TAB,
        mobileDisabled: true,
      },
      [ANALYSIS]: {
        name: this.props.intl.formatMessage(messages.analysis),
        link: this.props.createTabLink(ANALYSIS),
        component: <AutoAnalysisTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.AUTO_ANALYSIS_TAB,
        mobileDisabled: true,
      },
      [DEMO_DATA]: {
        name: this.props.intl.formatMessage(messages.demoData),
        link: this.props.createTabLink(DEMO_DATA),
        component: <DemoDataTab />,
        eventInfo: SETTINGS_PAGE_EVENTS.DEMO_DATA_TAB,
        mobileDisabled: true,
      },
    };
    if (!canSeeDemoData(this.props.accountRole, this.props.userRole)) {
      delete tabsConfig[DEMO_DATA];
    }
    return tabsConfig;
  };

  render() {
    return (
      <div className={cx('settings-page')}>
        <NavigationTabs
          config={this.createTabsConfig()}
          activeTab={this.props.activeTab}
          onChangeTab={this.props.changeTab}
        />
      </div>
    );
  }
}
