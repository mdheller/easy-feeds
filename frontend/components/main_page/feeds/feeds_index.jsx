import React from 'react';
import FeedsIndexRow from './feeds_index_row';
import AddFeedFormContainer from './add_feeds_form_container';

export class FeedsIndex extends React.Component {

  componentDidMount() {
    // this.props.fetchAllSubscriptions();
  }

  render() {
    const { feeds, subFeedIds, updateFeed, deleteFeed } = this.props;
    const feedsIndexRows = subFeedIds.map(feedId => {
      const feed = feeds[feedId];
      const props = { updateFeed, deleteFeed, feed };
      return <FeedsIndexRow key={feed.id} {...props} />;
    });

    return (
      <div className="feeds-index-container">
        <h1>Organize Sources</h1>
        <div className="feeds-following-sources">
          <p>Following <span>{subFeedIds.length} sources</span></p>
        </div>
        <div className="feeds-index">
          <div>
            <table>
              <thead>
                <tr className="feed-header-row">
                  <th className="feed-source-header">Source Name</th>
                  <th className="feed-status-header">Status</th>
                  <th className="feed-delete-header"></th>
                </tr>
              </thead>
              <tbody>
                {feedsIndexRows}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default FeedsIndex;
