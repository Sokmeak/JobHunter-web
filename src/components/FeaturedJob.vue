<template>
  <section class="featured-jobs py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Featured <span class="text-primary">jobs</span></h2>
        <a href="#" class="text-decoration-none text-primary"
          >Show all jobs <i class="bi bi-arrow-right"></i
        ></a>
      </div>

      <div class="row g-4">
        <div
          class="col-md-6 col-lg-3"
          v-for="(job, index) in featuredJobs"
          :key="index"
        >
          <JobCard :job="job" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import JobCard from "./JobCard.vue";

export default {
  name: "FeaturedJobs",
  components: {
    JobCard,
  },
  data() {
    return {
      featuredJobs: [
        {
          title: "Email Marketing",
          company: "Figma",
          location: "San Francisco, CA",
          type: "Full Time",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
          description:
            "Looking for a mid-level Email Marketing Manager to join our team.",
          tags: ["Marketing"],
        },
        {
          title: "Brand Designer",
          company: "Dropbox",
          location: "San Francisco, CA",
          type: "Full Time",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
          description: "Looking for a Brand Designer to help with our rebrand.",
          tags: ["Design"],
        },
        {
          title: "Email Marketing",
          company: "Webflow",
          location: "San Francisco, CA",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",
          description:
            "Looking for a mid-level Email Marketing Manager to join our team.",
          tags: ["Marketing"],
        },
        {
          title: "Visual Designer",
          company: "Spotify",
          location: "New York, NY",
          type: "Full Time",
          logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
          description: "Looking for a Visual Designer to join our team.",
          tags: ["Design"],
        },
        {
          title: "Product Designer",
          company: "Shopify",
          location: "Remote",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX////1+PGuzoGawk+ixmPk7dX7/Pnx9uuQvCygxV2QvDrP4bX8/fybwlfp8d/s8+O404/K3qzC2Z7S47ve6sumyGqpyHra4taVv0eTvkGQukZIgyi+15iVv0hcjD5ViS5xmlhik07k6uKUv0dejj5JgxvK18WtzXeuwqSEtgq00ISOrnuKuR+PuzVfjkC50456oWhBgAi8zbSctosfcwAVHUP+AAABXElEQVR4AW3ShWLCMBAA0HahIYS6bBdWF7SC/f+3LckS/KD6aifGPcwvNLOw8THmxDIXhC4/me24BvJ8a+Z+wCA0wqURRHHy/fNq2LFxYs99oGz1+6pWasSIvzLLYJUXZVU/3pgmiDSQAQDHtu3WN4o3jApgrFFYbLWZO8aF0mS/nylsDxrdHrilpnjG8I9jqTEmACr5iUrkYesUB2AbUaM5dhqFnalwYjDEhpFSyk2jzjUBIB7fsEyn8pALyiSa+wFuqHPBNAMaiL2I3rA9ql71In9L7C6HTOFYqTQFNvJejDS2BZYYEQBGMyIy3TCNp1piSAE2S9YH8sP1Y1Uum0Z8j+mJKrP7Y88SF5mogYyUgsb2Is/IZgUmv89/SGWUuWCScaUEoUGaxlGg1/c9zWTAA7adzAXP4zBBpCeskRdwHMe8uD6MEXbjNIG+Hxo+YKfieNb2eEk0JQcNf/qmMR8K5c7QAAAAAElFTkSuQmCC",
          description: "Looking for a Product Designer to join our team.",
          tags: ["Design"],
        },
        {
          title: "Lead Designer",
          company: "Dribbble",
          location: "Remote",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
          description: "Looking for a Lead Designer to join our team.",
          tags: ["Design", "Leadership"],
        },
        {
          title: "Brand Strategist",
          company: "Behance",
          location: "New York, NY",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEUFWP8AVv8ATP8ASv8AUf+lt/+ywf9lhf8ARv8AU/8AQP/y9f////91kv/q8P8ARP/S2v9ujf/l7P8ASP8yZv8ATv+5xv9nh//M1f+Spv/BzP/Y3/+4xP+ZrP+su/8AJv8AN/8APf/f5v8AL/8oX/88af9Qd/+Kof8IPKxZAAAAvUlEQVR4Ac3RRQKDMAAAwZLgLO5ab///w7qgZxZnLpHNcspsa0UhHwl1CqWmP9IM8/5hPfpD2+GVLlX38fT8P/QIQteNIFYUVUnSB/1h5qdmDqq6KYDS76Mt0oratqBuoBX/yCMnjjuq7S6BHkZZljkQR9RVlYGh/mG2l7ENbYQXRdEhynvoq+rRoykoj/bxdB5OJdShzME4lSDHi1Cbfseji/pF2WWPOuM+vfjcdldVnVl4KxXp8patFhe6ATwRD2y5uYPGAAAAAElFTkSuQmCC",
          description: "Looking for a Brand Strategist to join our team.",
          tags: ["Marketing"],
        },
        {
          title: "Data Analyst",
          company: "Twitter",
          location: "San Francisco, CA",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC",
          description: "Looking for a Data Analyst to join our team.",
          tags: ["Technology"],
        },
      ],
    };
  },
};
</script>
