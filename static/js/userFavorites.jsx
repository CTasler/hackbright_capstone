// {/* <button onClick={favButtonHandler} id="favbutton" >  
// <i className="fa fa-heart"></i>
// // </button> */}

function Favorite(props) {

  const data = {
    project_id: props.id
    };
    console.log(data)
  const favButtonHandler = (event => {
    if (confirm("Are you sure you want to remove this post from your favorites?"
    )) {
        fetch('/favorite', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        })
        .then(() => window.location.reload());
        }
  });

  const joinButtonHandler = (event => {
    fetch('/apply', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
      }
    }) 
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.already_applied === "true") {
          alert("You already applied for this team.")
        } else if (responseJson.on_team === "true") {
          alert("You are already on this team.")
        } else {
        alert(`Your application was registered. If your application is accepted, the project will show up in the "Your Teams" section of your profile.`);
        }
    })
  });

  return (
    <div className="rounded card" style={{backgroundColor: "#8E8D8A"}}>
      <div>
        <div>
          <i id="favbutton" className="fa-solid fa-heart fa-2x" style={{ color: '#E98074'}} onClick={favButtonHandler}></i>
        </div>
      </div>
      <div>
        <h4> Title: {props.title} </h4>
      </div>
      <div>
        <p> Posted by: {props.username}</p>
      </div>
      <div>
        <p> Summary: {props.summary} </p>
        <p> Libraries: {props.specs} </p>
        <p> GitHub URL: <a href={`${props.project_github}`}>{props.project_github}</a></p>
        <p> Required Experience Level: {props.req_exp_level}</p>
        <p> Required Current or Previous Roles: {props.req_roles}</p>
        <p> Project ID: { props.id }</p>
      </div>
      <div style={{position: "absolute", bottom: 20,}}>
          <button onClick={joinButtonHandler} id="joinbutton" className="btn btn-sm btn-outline-dark" style={{backgroundColor: "#E85A4F", marginLeft: 225}}>Join Team</button>
      </div>
    </div>
  );
}

function FavoritesContainer() {

  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    fetch("/user-favorites.json")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data.user_favorites)
      }
        )
  }, []);
  console.log(favorites)
  const userFavorites = [];
  for (const currentFavorite of favorites) {
    userFavorites.push(
    <Favorite
      key={currentFavorite.project_id}
      id={currentFavorite.project_id}
      username={currentFavorite.username}
      title={currentFavorite.title} 
      summary={currentFavorite.summary}
      specs={currentFavorite.specs}
      project_github={currentFavorite.project_github}
      req_exp_level={currentFavorite.req_exp_level}
      req_roles={currentFavorite.req_roles.join(", ")}
    />
      );
    }

    return (
      <div>
        <div>
          <h1 className="title" style={{textAlign: "left"}}> Your Favorites </h1>
        </div>
        <div className="flex-container-horizontal horizontal-scroll">
          { userFavorites }
        </div>
      </div>
    );
  }

ReactDOM.render(<FavoritesContainer />, document.querySelector('#favorites-cont'));