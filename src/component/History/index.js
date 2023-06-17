import {Component} from 'react'
import HistoryItem from '../HistoryItem'
import './index.css'

const initialHistoryList = []

class History extends Component {
  state = {
    searchInput: '',
    isShow: false,
    HistoryList: initialHistoryList,
  }

  updateSearch = value => {
    this.setState({
      searchInput: value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deleteHistory = id => {
    const {HistoryList} = this.state
    const filteredUserData = HistoryList.filter(each => each.id !== id)

    this.setState({
      HistoryList: filteredUserData,
    })
    console.log(HistoryList.length)
    if (HistoryList.length === 1) {
      this.setState({isShow: true})
    }
  }

  render() {
    const {searchInput, HistoryList, isShow} = this.state

    const searchResults = HistoryList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <>
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/search-img.png"
              alt="search"
              className="search-icon"
            />
            <input
              type="search"
              className="search-input"
              placeholder="Search history"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
          </div>
        </div>
        <div className="app-container">
          <ul className="history-container">
            {searchResults.length === 0 ? (
              <p className="error">There is no history to show</p>
            ) : (
              searchResults.map(eachHistory => (
                <HistoryItem
                  key={eachHistory.id}
                  historyDetails={eachHistory}
                  updateSearch={this.updateSearch}
                  deleteHistory={this.deleteHistory}
                />
              ))
            )}
          </ul>
        </div>
      </>
    )
  }
}

export default History
