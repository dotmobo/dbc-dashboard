import configparser
import requests
import datetime


def run():
    config = configparser.ConfigParser()
    config.read("config.ini")
    api_url = config["api"]["url"]
    dawn_sc = config["sc"]["dawn"]
    genesis_sc = config["sc"]["genesis"]
    dawn_url = "{}/accounts/{}/transactions?size=10000&status=success&order=asc&function=stake%2Cunstake".format(
        api_url, dawn_sc
    )
    genesis_url = "{}/accounts/{}/transactions?size=10000&status=success&order=asc&function=stake%2Cunstake".format(
        api_url, genesis_sc
    )

    print("Generating stakers report for Dawn")
    print("=================================")
    print("SC: {}\n".format(dawn_sc))
    dawn_resume = []
    dawn_response = requests.get(dawn_url)
    for tx in dawn_response.json():
        fun = tx.get("function")
        sender = tx.get("sender")
        nbr = len(tx.get("action").get("arguments").get("transfers"))
        if fun == "stake":
            dawn_resume.append((sender, nbr, "Dawn"))
        elif fun == "unstake":
            dawn_resume = list(filter(lambda x: x[0] != sender, dawn_resume))

    print("Generating stakers report for Genesis")
    print("=====================================")
    print("SC: {}\n".format(genesis_sc))
    genesis_resume = []
    genesis_response = requests.get(genesis_url)
    for tx in genesis_response.json():
        fun = tx.get("function")
        sender = tx.get("sender")
        nbr = len(tx.get("action").get("arguments").get("transfers"))
        if fun == "stake":
            genesis_resume.append((sender, nbr, "Genesis"))
        elif fun == "unstake":
            genesis_resume = list(filter(lambda x: x[0] != sender, genesis_resume))

    # Fusion of both
    resume = dawn_resume + genesis_resume

    # List to csv
    csv = "type,address,nfts\n"
    for item in resume:
        csv += "{},{},{}\n".format(item[2], item[0], item[1])

    # write the csv in a file in the same directory with the date in the name
    file_name = "stakers_{}.csv".format(datetime.datetime.now().strftime("%Y-%m-%d"))
    with open(file_name, "w") as f:
        f.write(csv)

    print("Done!")


if __name__ == "__main__":
    run()
