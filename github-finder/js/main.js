$(document).ready(function () {

    $("#searchUser").on('keyup', function (e) {

        let username = e.target.value;

        // Making request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'd93541ab9181fea4ad2b',
                client_secret: 'd84633c27145d350e9eba716b64d594254f4f48f'
            }
        }).done(function (user) {

            $.ajax({
                url:'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'd93541ab9181fea4ad2b',
                    client_secret: 'd84633c27145d350e9eba716b64d594254f4f48f'
                }
            }).done(function(repos){
                console.log(repos);
            })

            $('#profile').html(`
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body" >
            <div class="row">
            <div class="col-md-3">
            <img style="width: 100%" class="thumbnail avatar" src="${user.avatar_url}" alt="">
            <a taget="_blank"  class="btn btn-primary" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="label label-default">Public Repos : ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span><br>
                <br>
                <ul class = "list-group">
                    <li class ="list-group-item">Company: ${user.company}</li>
                    <li class ="list-group-item">Website/blog: ${user.blog}</li>
                    <li class ="list-group-item">Location: ${user.location}</li>
                    <li class ="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
            </div>
          </div>
        </div>
            </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos:</h3>
          <div id="repos"></div>
            `)
        })
    })

    
    $('#clearBtn').on('click',function(e){
        $('#searchUser').val("");
        $('#profile').html("");
    })

})
