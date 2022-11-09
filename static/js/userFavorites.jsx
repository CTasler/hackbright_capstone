function Favorite(props) {
  
  return (
    <div className="boxes">
      <div>
        <h4> Title: {props.title} </h4>
      </div>
      <div>
        <p> Posted by: {props.username}</p>
      </div>
      <div>
        <p> Summary: {props.summary} </p>
        <p> Libraries: {props.specs} </p>
        <p> GitHub URL: {props.project_github}</p>
        <p> Required Experience Level: {props.req_exp_level}</p>
        <p> Required Current or Previous Roles: {props.req_roles}</p>
      </div>
    </div>
  );
}



// function FavoritesContainer() {
//   const [favorites, setFavorites] = React.useState([])

//   React.useEffect(() => {
//     fetch("/user-favorites.json")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.project)
//         setFavorites(data.project)
//       }
//         )
//   }, []);
//   const Favorites = [];
//   for (const currentFavorite of favorites) {
//     Favorites.push(
//     <Favorite
//       key={currentFavorite.projectId}
//       username={currentFavorite.username}
//       title={currentFavorite.title} 
//       summary={currentFavorite.summary}
//       specs={currentFavorite.specs}
//       project_github={currentFavorite.project_github}
//       req_exp_level={currentFavorite.req_exp_level}
//       req_roles={currentFavorite.req_roles}
//     />
//       );
//     }

//     return (
//       <div>
//          <h1> Your Favorites </h1>
//         {Favorites}
//       </div>
//     );
//   }

// ReactDOM.render(<FavoritesContainer />, document.querySelector('#favorites-cont'));