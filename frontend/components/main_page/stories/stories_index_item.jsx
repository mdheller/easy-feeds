import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class StoriesIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleXClick = this.handleXClick.bind(this);
    this.handleReadClick = this.handleReadClick.bind(this);
    this.state = { hidden: Boolean(props.story.read), read: Boolean(props.story.read), isMouseInside: false };
  }

  handleRedirect(e, id) {
    e.persist();
    window.e = e;
    const target = e.target.parentElement;
    if ((!target.className.includes("read-story") && !target.className.includes("hide-story"))) {
      const originPath = this.props.history.location.pathname;

      if (e.target.tagName.toLowerCase() !== 'a') {
        this.props.history.push(`${originPath}/stories/${id}`);
      }
      this.handleReadClick(e);
    }
  }

  handleXClick(e) {
    e.preventDefault();
    this.setState({ hidden: true });
  }

  handleReadClick(e) {
    e.preventDefault();
    this.props.readStory(this.props.story.id);
    this.setState({ read: !this.state.read });
  }

  render() {
    const { story, feed } = this.props;
    let pubDateTime = moment(story.pub_datetime).fromNow();
    pubDateTime = pubDateTime.split(" ")[0] === "in" ? "Just now" : pubDateTime;

    const summary = story.teaser ? story.teaser.slice(0,250).split(" ").slice(0, -1).join(" ") + "..." : null;
    const summaryText = {__html: summary};

    const backgroundImage = `url(${story.image_url || feed.favicon_url})`;
    const imageStyle = {backgroundImage};

    const originPath = this.props.history.location.pathname;

    const readStateClass = "story-index-item"
                           + `${this.state.hidden ? " hidden" : ""}`
                           + `${this.state.read ? " read" : ""}`;

    return (
      <div className={`${readStateClass}`}
        onMouseEnter={e => this.setState({ isMouseInside: true })}
        onMouseLeave={e => this.setState({ isMouseInside: false })}
        onClick={e => this.handleRedirect(e, story.id)}
        >
        <div className="story-item-image" style={imageStyle} />
        <div className="story-details">
          <h4>
            <Link to={`${originPath}/stories/${story.id}`}>
              {story.title}
            </Link>
          </h4>

          <h5>
            { !this.props.titleLink ?
              <Link to={`/i/subscriptions/${story.feed_id}`}>
                {feed.subscription_title}
              </Link> : null
            }
            {` by ${story.author} / ${pubDateTime}`}
          </h5>
            <p dangerouslySetInnerHTML={summaryText} />
          <div className={`noselect read-story${this.state.isMouseInside ? "" : " hidden"}`}
            onClick={this.handleReadClick}>{this.state.read ? <i className="fa fa-check-square" aria-hidden="true"></i> : <i className="fa fa-check-square-o" aria-hidden="true"></i> }</div>
          <div className={`noselect hide-story${this.state.isMouseInside ? "" : " hidden"}`}
            onClick={this.handleXClick}><i className="fa fa-times" aria-hidden="true"></i></div>
        </div>
      </div>
    );
  }
}

export default StoriesIndexItem;
