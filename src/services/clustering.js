const KMeans = require('shaman').KMeans;

class Clustering {
    getClusters(data, number) {
        const kmeans = new KMeans(number)
        let c
        kmeans.cluster(data, (err, clusters, centroids) => {
            if (err === null)
                c = clusters
        })
        return c
    }
}

export default new Clustering()