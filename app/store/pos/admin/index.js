export const state = () => ({
    auth: {
        "access-token": null,
        client: null,
        uid: null
    },
    user: {
        name: null,
        authority: null,    // 1:admin, 2:pos, 3:arriver
    },
});

export const mutations = {
    setAuth(state, {access_token, client, uid}){
        state.auth = {
            "access-token": access_token,
            client: client,
            uid: uid
        }
    },
    setAdminData(state, {name, authority}) {
        state.user = {
            name: name,
            authority: authority
        }
    }
}

export const actions = {
    async loginAdmin({ commit }, {email, password}) {
        const response = await this.$axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
            data: {
                email: email,
                password: password
            },
            url: "http://localhost:3000/api/v1/auth/sign_in"
        })
        .catch(err => {
            return false
        });

        if (response.status == 200) {
            await commit("setAuth", {
                access_token: response.headers["access-token"],
                client: response.headers["client"],
                uid: response.headers["uid"]
            });

            await commit("setAdminData", {
                name: response.data.data.name,
                authority: response.data.data.authority_id
            });

            return true
        } else {

            return false
        }
    },
    async logout({commit}) {
        await commit("setAuth", {
            access_token: null,
            client: null,
            uid: null
        });

        await commit("setAdminData", {
            name: null,
            authority: null
        });

    }

}