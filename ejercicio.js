console.log("Inicio");

async function fetchUserData(userId) {
  try {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await userResponse.json();
    console.log("Datos del usuario:", user);
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
}

async function fetchUserPosts(userId) {
  try {
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await postsResponse.json();
    console.log("Posts del usuario:", posts);
    return posts;
  } catch (error) {
    console.error("Error al obtener los posts del usuario:", error);
  }
}

async function fetchPostComments(postId) {
  try {
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await commentsResponse.json();
    console.log(`Comentarios del post ${postId}:`, comments);
    return comments;
  } catch (error) {
    console.error(`Error al obtener los comentarios del post ${postId}:`, error);
  }
}

async function main() {
  const userId = 1;
  const user = await fetchUserData(userId);
  const posts = await fetchUserPosts(userId);

  const commentsPromises = posts.map(post => fetchPostComments(post.id));
  const comments = await Promise.all(commentsPromises);

  const postsWithManyComments = posts.filter((post, index) => comments[index].length > 5);
  console.log('Posts con más de 5 comentarios:', postsWithManyComments);

  const postTitles = posts.map(post => post.title);
  console.log('Títulos de los posts:', postTitles);

  const totalComments = comments.reduce((acc, curr) => acc + curr.length, 0);
  console.log('Total de comentarios:', totalComments);
}

main().catch(error => console.error('Error en la función principal:', error));

console.log("Fin");